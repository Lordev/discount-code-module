# 💳 Discount code module

A discount code management system built with React and TypeScript. This module provides a complete solution for creating, managing, and tracking discount codes with advanced form validation. I built this project for learning purposes, focusing on complex form handling and state management patterns.

## 📦 Technologies

- `React.js`
- `TypeScript`
- `Bootstrap 5`
- `Zustand`
- `Zod`
- `Axios`
- `Sass/SCSS`
- `MockAPI`

##  Features

Here's what you can do with the Discount Code Manager:

- **Create Discount Codes**: Generate discount codes with flexible configurations. Choose between percentage discounts or fixed amount discounts.
  
- **Form Validation**: Real-time form validation with Zod schema validation. The system provides immediate feedback and handles complex validation rules based on discount type.
  
- **Manage Discount Lists**: View all your discount codes in an organized list. Filter and sort codes based on status (active, expired, future).
  
- **Date Range Control**: Set validity periods with start and end dates. Codes automatically transition between future, active, and expired states.
  
- **Usage Tracking**: Monitor discount code usage with configurable limits to prevent abuse.

- **Sorting & Searching**: Sort discount codes and search by title for quick access and management.

## 👩🏽‍🍳 The Process

I set out to build a discount code management module that could be easily integrated into SaaS platforms or e-commerce backoffices. The aim was to create a robust, reusable micro frontend with advanced form validation and flexible configuration.

To achieve this, I designed and implemented a system for creating, managing, and tracking discount codes, focusing on handling complex forms and edge cases. I made sure the architecture was modular and maintainable for future reuse.

I started by setting up the basic React TypeScript structure with Bootstrap for styling. The discount form was built with dynamic validation using Zod, handling conditional rules and edge cases like positive amounts and date validation. 

To ensure code quality and reliability, I implemented automated unit tests for the core functionality using Jest and Testing Library. I also set up Husky to run tests locally before each commit and push, and configured GitHub Actions to run all tests on every push. This CI/CD pipeline helps catch issues early and keeps the codebase robust.

I implemented a global state management pattern to keep form state and discount list state separate, ensuring clean separation of concerns. Axios was integrated for API communication and CRUD operations, with proper error handling throughout.

The UI was enhanced with custom SCSS and reusable SVG icon components, and the codebase was organized into a scalable folder structure with routing for maintainability. The result is a fully functional discount code module with real-time validation, CRUD operations, and a polished UI.

## 📚 What I Learned

During this project, I've picked up important skills and a better understanding of complex ideas, which improved my logical thinking.

### 🧠 Advanced Form Handling

- **Complex Validation Logic**: Implementing sophisticated form validation with conditional rules based on discount type taught me how to handle complex form states and edge cases.
- **Schema-driven Validation**: Using Zod for runtime type checking and validation helped me understand the power of schema-driven development.

### 🎯 State Management & Architecture

- **Logical Thinking**: Implementing a global state management pattern taught me how to efficiently manage shared state in a React application. I learned how to structure state and actions for scalability.
- **Separation of Concerns**: Managing form state separately from application state improved the overall architecture.

### 🎨 TypeScript Integration

- **Type Safety**: Working with TypeScript throughout the application enhanced my understanding of type-driven development and helped catch errors early.
- **Schema Inference**: Learning how to infer types from Zod schemas created a seamless development experience.

### 📈 Overall Growth

Each part of this project helped me understand more about building scalable web applications with proper validation and state management. The most challenging and rewarding part was handling the complex form validation with all its edge cases. This could easily be integrated into a SaaS platform or e-commerce backoffice for clients.

## 💭 How can it be improved?

It can be integrated into a larger system with stuff like:

- Bulk operations: batch discount code creation and management.
- Analytics dashboard: usage analytics and performance metrics.
- Template system: predefined discount templates for quick setup.
- Advanced filtering: more sophisticated search and filter options.
- Export functionality: CSV/Excel export for reporting.
- Internationalization: multi-language support for global deployment.

## 🚦 Running the Project

To run the project in your local environment, follow these steps:

1. Clone the repository to your local machine.
2. Run `yarn install` in the project directory to install the required dependencies.
3. Run `yarn start` to get the project started.
4. Open [http://localhost:3000](http://localhost:3000) (or the address shown in your console) in your web browser to view the app.

## 🍿 Video
