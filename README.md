# ReadyRoster Basketball Platform

A comprehensive basketball team management platform with live streaming, statistics tracking, and film analysis capabilities.

# Project Overview

This project is a modern web application built with a focus on scalability, performance, and maintainability. Below is an overview of the tech stack and tools used to create it.

## Tech Stack

### Frontend
- **React**: The frontend is built using React, a popular JavaScript library for building user interfaces.
- **TypeScript**: TypeScript is used to add static typing to the codebase, improving code quality and developer experience.
- **Vite**: Vite is used as the build tool for its fast development server and optimized production builds.
- **Tailwind CSS**: Tailwind CSS is used for styling, with custom themes and utility-first CSS classes.
  - Plugins: 
    - `@tailwindcss/typography` for enhanced typography styles.
    - `tailwindcss-animate` for animations.

### Backend
- **Node.js**: The backend is built using Node.js for its asynchronous, event-driven architecture.
- **Express**: Express is used as the web framework to handle routing and middleware.
- **Drizzle ORM**: Drizzle ORM is used for database interactions, providing a type-safe and developer-friendly API.

### Shared Code
- **Shared Schema**: The project includes a shared schema in the `shared/` directory to ensure consistency between the frontend and backend.

### Configuration and Build Tools
- **PostCSS**: PostCSS is used for processing CSS with plugins like Tailwind CSS.
- **ESLint & Prettier**: These tools are used to enforce code quality and formatting standards.
- **TypeScript Config**: A custom `tsconfig.json` is used to define TypeScript compiler options.

## Project Structure

The project is organized into the following directories:

- `client/`: Contains the frontend code, including React components, hooks, and pages.
- `server/`: Contains the backend code, including routes, storage logic, and server configuration.
- `shared/`: Contains shared code, such as schemas and utilities, used by both the frontend and backend.

## How It Was Built

1. **Frontend Setup**:
   - Initialized the frontend using Vite with React and TypeScript templates.
   - Configured Tailwind CSS with a custom theme and added plugins for animations and typography.

2. **Backend Setup**:
   - Set up a Node.js server with Express for routing.
   - Integrated Drizzle ORM for database operations.

3. **Shared Code**:
   - Created a shared schema to ensure consistency between the frontend and backend.

4. **Build and Deployment**:
   - Configured Vite for optimized builds.
   - Used `package.json` scripts to streamline development and production workflows.

## Development Workflow

- **Start Development Server**:
  ```sh
  npm run dev   
  ```











<!-- # Project Overview

This project is a modern web application built with a focus on scalability, performance, and maintainability. Below is an overview of the tech stack and tools used to create it.

## Tech Stack

### Frontend
- **React**: The frontend is built using React, a popular JavaScript library for building user interfaces.
- **TypeScript**: TypeScript is used to add static typing to the codebase, improving code quality and developer experience.
- **Vite**: Vite is used as the build tool for its fast development server and optimized production builds.
- **Tailwind CSS**: Tailwind CSS is used for styling, with custom themes and utility-first CSS classes.
  - Plugins: 
    - `@tailwindcss/typography` for enhanced typography styles.
    - `tailwindcss-animate` for animations.

### Backend
- **Node.js**: The backend is built using Node.js for its asynchronous, event-driven architecture.
- **Express**: Express is used as the web framework to handle routing and middleware.
- **Drizzle ORM**: Drizzle ORM is used for database interactions, providing a type-safe and developer-friendly API.

### Shared Code
- **Shared Schema**: The project includes a shared schema in the `shared/` directory to ensure consistency between the frontend and backend.

### Configuration and Build Tools
- **PostCSS**: PostCSS is used for processing CSS with plugins like Tailwind CSS.
- **ESLint & Prettier**: These tools are used to enforce code quality and formatting standards.
- **TypeScript Config**: A custom `tsconfig.json` is used to define TypeScript compiler options.

## Project Structure

The project is organized into the following directories:

- `client/`: Contains the frontend code, including React components, hooks, and pages.
- `server/`: Contains the backend code, including routes, storage logic, and server configuration.
- `shared/`: Contains shared code, such as schemas and utilities, used by both the frontend and backend.

## How It Was Built

1. **Frontend Setup**:
   - Initialized the frontend using Vite with React and TypeScript templates.
   - Configured Tailwind CSS with a custom theme and added plugins for animations and typography.

2. **Backend Setup**:
   - Set up a Node.js server with Express for routing.
   - Integrated Drizzle ORM for database operations.

3. **Shared Code**:
   - Created a shared schema to ensure consistency between the frontend and backend.

4. **Build and Deployment**:
   - Configured Vite for optimized builds.
   - Used `package.json` scripts to streamline development and production workflows.

## Development Workflow

- **Start Development Server**:
  ```sh
  npm run dev -->
