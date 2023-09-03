[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=marcosbermejo_nodejs-restful-api&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=marcosbermejo_nodejs-restful-api)

# RESTful API with Express and TypeScript

This project is a RESTful API developed in Node.js using Express.js as the primary framework. The API is written in TypeScript for better typing support and is configured with best development practices. Below are the key highlights of the project:

## Key Features

- **RESTful API with Express:** The application uses `Express.js` to create a RESTful API that provides endpoints for interacting with resources.

- **TypeScript Support:** The project is written in `TypeScript`, providing an additional layer of static typing to prevent common development errors.

- **Mongoose for Data Access:** Data is managed and accessed using `Mongoose`, a popular ODM (Object-Document Mapping) library for `MongoDB`. This enables efficient and structured data operations within the application.

- **Centralized Error Handling with express-async-errors:** Unhandled errors are centrally managed using the `express-async-errors` module, ensuring robust error handling throughout the application.

- **Data Validation with express-validator:** Input data is validated using the popular `express-validator` library, helping to ensure data integrity and security.

- **Linting with ESLint and Airbnb Base:** `ESLint` has been configured following Airbnb's style rules to maintain clean and consistent code.

- **Integration Testing with Jest and Supertest:** Integration tests have been created using `Jest` and `Supertest` to ensure the proper functioning of the API.

- **Logging with Winston:** Application events and logs are managed using `Winston`, providing a structured approach to log management.

- **Husky and Commitlint:** `Husky` is used to run ESLint and tests before each commit to ensure code quality. `Commitlint` is used to validate commit message titles according to conventional commit standards.

- **Metrics with Prometheus and prom-client:** The application tracks request metrics using Prometheus and the `prom-client` library, allowing you to monitor and analyze API performance. You can access the metrics in Prometheus format at [http://localhost:3000/metrics](http://localhost:3000/metrics) when the application is running.

- **Swagger Documentation:** API documentation is available using `Swagger`. You can access the Swagger documentation at [http://localhost:3000/](http://localhost:3000) when the application is running.

- **Code Quality Monitoring with SonarCloud:** The code quality and security of this project are continuously monitored by `SonarCloud`, providing insights and suggestions for improvement.

## Setting up MongoDB

To run this project, you'll need to have MongoDB installed. The easiest way to get started is by using Docker to run a MongoDB container.

1. Open your terminal and run the following command to start a MongoDB container:

   ```bash
   docker run --name mongodb -p 27017:27017 -d mongo
   ```

Note: This command is required to run the API locally at http://localhost:3000.

For running integration tests, you don't need to execute the Docker command mentioned above. The integration tests utilize `mongodb-memory-server` to create an in-memory MongoDB instance for testing purposes.

## Running Instructions

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run the Application:**
   ```bash
   npm run
   ```

3. **Run Tests:**
   ```bash
   npm test
   npm test:cov # code coverage
   ```

## API Endpoints

| HTTP Verbs | Endpoints | Action               |
| ---------- | --------- | ------------------- |
| GET        | /clubs    | Retrieve a list of all active clubs |
| POST       | /clubs    | Create a new club    |
| GET        | /clubs/:id | Get details of a club |
| DELETE     | /clubs/:id | Soft delete a club and its associated teams   |
| GET        | /teams    | Retrieve a list of all active teams |
| POST       | /teams    | Create a new team    |
| GET        | /teams/:id | Get details of a team |
| DELETE     | /teams/:id | Soft delete a team   |
