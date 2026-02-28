```markdown
# AGENTS.md File Guidelines

These guidelines are designed to ensure the consistent, maintainable, and high-quality development of the AGENTS repository. Adherence to these principles is mandatory for all development efforts.

## 1. DRY (Don't Repeat Yourself)

*   All code should be reusable.  Avoid duplicating logic across different modules or files.
*   When a functionality is implemented, it should be encapsulated in a separate, well-documented module or class.
*   Leverage existing libraries and components whenever possible.
*   Refactor code to eliminate redundancy.

## 2. KISS (Keep It Simple, Stupid)

*   Prioritize clarity and readability over complex solutions.
*   Use the shortest, most straightforward code to achieve the desired outcome.
*   Avoid unnecessary abstraction or over-engineering.
*   Design for minimal complexity – the simpler the solution, the easier it is to understand and debug.

## 3. SOLID Principles

*   **Single Responsibility Principle:** Each class/module/function should have one primary responsibility.
*   **Open/Closed Principle:**  The system should be extensible without modifying the core code. Use interfaces and abstraction to achieve this.
*   **Liskov Substitution Principle:**  Subclasses should be able to replace their base classes without breaking the correctness of the program.
*   **Interface Segregation Principle:** Client code should not be forced to depend on interfaces it does not use.
*   **Dependency Inversion Principle:**  High-level modules should not depend on low-level modules; they should depend on abstractions.

## 4. YAGNI (You Aren't Gonna Need It)

*   Avoid premature implementation of features or code. Focus solely on what is absolutely necessary to achieve the current goal.
*   Only implement functionality that is explicitly required for the current task.
*   Refactor code to remove any unused features or code.

## 5. Code Style & Formatting

*   **Indentation:** Use 2 spaces for indentation.
*   **Line Length:** Keep lines under 120 characters.
*   **Naming Conventions:** Follow established naming conventions (e.g., snake_case for functions, classes, variables).
*   **Comments:**  Provide clear and concise comments explaining complex logic or non-obvious sections of code.  Don’t comment over code that’s already self-explanatory.
*   **Whitespace:** Use whitespace consistently to improve readability.

## 6. File Size Limit

*   Each file shall not exceed 180 lines of code.

## 7. Testing

*   All development must be productive.
*   Unit tests shall be written for all code.
*   Tests must be comprehensive and cover all relevant functionalities.
*   Tests shall be run automatically (continuous integration).
*   Tests shall use mocks as primary focus.
*   Failing tests shall be immediately flagged and resolved.

## 8. Development Workflow

*   Code shall be committed frequently with meaningful commit messages.
*   Code reviews shall be conducted regularly.
*   Code shall be documented thoroughly, including API documentation.
*   Branching shall be used to isolate changes and prevent conflicts.

## 9.  Data Structures & Algorithms

*   Use appropriate data structures for efficient storage and retrieval of data.
*   Favor simple, well-understood algorithms.
*   Consider performance implications of algorithm choices.

## 10.  Error Handling

*   Error handling shall be clear and informative.
*   Use exceptions where appropriate.
*   Log errors appropriately.

## 11.  Maintainability

*   Code shall be easily understandable and adaptable.
*   Follow established coding standards.
*   Utilize design patterns where appropriate.

## 12.  Documentation

*   API documentation will be created using [Specify Tool/Format - e.g., Swagger, Sphinx].
*   Code comments will follow the principles outlined above.

## 13.  Traceability

*   Each component/module/function will be clearly documented with associated dependencies and specifications.

## 14.  Targeted Functionality

*   All features should be prioritized and tested before release.
*   Consider edge cases and error scenarios during development.
```