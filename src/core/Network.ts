import * as cheerio from "cheerio";
import * as request from "request-promise-native";

export default class Network {

  public static readonly DOMAIN: string = "https://siga.cps.sp.gov.br";
  public static readonly ROUTES = {
    ACADEMIC_CALENDAR: "/aluno/alu_alunocalendario.aspx",
    EXCHANGE_PROGRAMS: "/aluno/intercambio.aspx",
    HISTORY: "/aluno/historicocompleto.aspx",
    HOME: "/aluno/home.aspx",
    LOGIN: "/aluno/login.aspx",
    PARTIAL_ABSENSES: "/aluno/faltasparciais.aspx",
    PARTIAL_GRADES: "/aluno/notasparciais.aspx",
    SCHEDULE: "/aluno/horario.aspx",
    SCHOOL_GRADE: "/aluno/historicograde.aspx",
  };
  public static readonly STATUS = {
    REDIRECT: 303,
  };

  public static getCookieFromResponse (response: any): string {
    return response.hasOwnProperty("headers") ? response.headers["set-cookie"].join(";") : "";
  }

  public static scrap ({ cookie, route, scrapper }: {cookie: string, route: string, scrapper: (object) => void}): any {
    if (!this.scrapperCache[cookie]) {
      this.scrapperCache[cookie] = {};
    }
    if (this.scrapperCache[cookie][route]) {
      if (!this.scrapperCache[cookie][route].isExpired()) {
        return Promise.resolve(scrapper(this.scrapperCache[cookie][route].$));
      }
      this.scrapperCache[cookie][route] = null;
    }
    let promise = Promise.resolve("");
    if (!cookie) {
      promise = promise.then(() => {
        throw new Error("Missing cookie, try logging in");
      });
    }
    return promise.then(() => {
      return Network.get({ cookie, route }).then((html) => {
        const $ = cheerio.load(html, { decodeEntities: true });
        const createdAt = +new Date();
        const duration = 1000 * 60 * 5;
        this.scrapperCache[cookie][route] = {
          $,
          isExpired () {
           return +new Date() > (createdAt + duration);
          },
        };
        return scrapper($);
      });
    });
  }

  public static post ({ form, route }: { form: object, route: string}): Promise<any> {
    const options = Network.buildOptions({
      form,
      method: "POST",
      route,
    });
    return this.delayedRequest(options);
  }

  public static get ({ cookie, route, isImage }: { cookie?: string, route: string, isImage?: boolean}): Promise<any> {
    const options = {
      encoding: null,
      headers: {},
      method: "GET",
      route,
    };

    if (cookie) {
      options.headers = {
        Cookie: cookie,
      };
    }

    if (isImage) {
      options.encoding = "base64";
    }

    return this.delayedRequest(Network.buildOptions(options));
  }

  private static scrapperCache = {};
  private static requestsQueue = 0;

  private static delayedRequest (options: object): Promise<any> {
    const position = ++Network.requestsQueue;
    return new Promise((resolve, reject) => {
      if (position > 1) {
        setTimeout(() => {
          if (Network.requestsQueue === 1) {
            Network.requestsQueue--;
            request(Object.assign({
              jar: false,
            }, options)).then(resolve).catch(reject);
          }
        }, 1000);
      } else {
        Network.requestsQueue--;
        request(Object.assign({
          jar: false,
        }, options)).then(resolve).catch(reject);
      }
    });
  }

  private static buildOptions ({ method, route, headers, form, encoding }:
    {
      method: string,
      route: string,
      headers?: object,
      form?: object,
      encoding?: string,
    }): object {
    headers = headers || {};
    headers["User-Agent"] = "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 " +
                            "(KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36";
    headers["Origin"] = this.DOMAIN;
    if (method.toLowerCase() === "post") {
      headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
    const uri: string = !route.startsWith("http") ? `${this.DOMAIN}${route}` : route;

    return {
      encoding,
      form: Object.assign({
        GXState: '{"_EventName":"EENTER.","_EventGridId":"","_EventRowId":"",' +
        '"MPW0005_CMPPGM":"login_top.aspx","MPW0005GX_FocusControl":"","vREC_' +
        'SIS_USUARIOID":"","GX_FocusControl":"vSIS_USUARIOID","GX_AJAX_KEY":"' +
        '0BDD4711481AA1585555288A38D54A0E","AJAX_SECURITY_TOKEN":"60D2197ED30' +
        'EA865BA4DDC1181C00E9DE327E1CD49D496228104BEF231E87A2D","GX_CMP_OBJS"' +
        ':{"MPW0005":"login_top"},"sCallerURL":"","GX_RES_PROVIDER":"GXResour' +
        'ceProvider.aspx","GX_THEME":"GeneXusX","_MODE":"","Mode":"","IsModif' +
        'ied":"1"}',
      }, form),
      headers,
      method,
      params: {
        "165c97fac0d4c1ad6055e3730b7af070,,gx-no-cache": 1513131652687,
      },
      strictSSL: false,
      uri,
    };
  }

}
