# Express TypeScript Microservice Template

This project serves as a template for creating microservices using Express and TypeScript. It includes automatic Swagger documentation, logging, and a modular structure for easy expansion.

## Features

- Express.js with TypeScript
- Automatic Swagger documentation using `routing-controllers-openapi`
- Logging with Morgan (console and file logging)
- Modular structure for easy scaling
- Basic example controller with OpenAPI decorators

## Project Structure

```
.
├── src/
│   ├── config/
│   │   ├── morgan.ts
│   ├── controllers/
│   │   └── ExampleController.ts
│   └── index.ts
├── logs/
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Prerequisites

- Node.js (v14 or later recommended)
- npm (v6 or later)

## Setup

1. Clone this repository:
   ```
   git clone <repository-url>
   cd express-typescript-microservice
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add any necessary environment variables. For example:
   ```
   PORT=3000
   ```

4. Start the development server:
   ```
   npm run dev
   ```

The server will start, and you should see output indicating the server is running and where the Swagger UI is available.

## Scripts

- `npm run dev`: Start the development server with hot-reloading
- `npm run build`: Build the TypeScript code
- `npm start`: Start the production server (run `npm run build` first)
- `npm run lint`: Run the linter (if configured)
- `npm test`: Run tests (if configured)

## API Documentation

Once the server is running, you can access the Swagger UI at:

```
http://localhost:3000/api-docs
```

This provides interactive documentation for your API endpoints.

## Logging

Logs are output to both the console and a file:

- Console logs use the 'dev' format from Morgan for readability
- File logs are stored in `logs/app.log` and rotate daily

Swagger-related requests are excluded from logs.

## Adding New Routes

1. Create a new controller file in `src/controllers/`
2. Define your routes using decorators from `routing-controllers`
3. Use OpenAPI decorators for automatic Swagger documentation
4. Import and add your controller to the `controllers` array in `src/index.ts`

Example:

```typescript
import { JsonController, Get } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

@JsonController('/example')
export class ExampleController {
    @Get('/')
    @OpenAPI({
        summary: 'Example endpoint',
        responses: {
            '200': {
                description: 'Successful response',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                message: { type: 'string' }
                            }
                        }
                    }
                }
            }
        }
    })
    getExample() {
        return { message: 'This is an example response' };
    }
}
```

## Configuration

- Swagger: Update `src/config/swagger.ts` to modify Swagger configuration
- Logging: Modify `src/config/morgan.ts` to adjust logging settings

## Best Practices

- Keep controllers small and focused
- Use services for business logic
- Implement proper error handling
- Write unit tests for your controllers and services
- Use environment variables for configuration
- Regularly update dependencies

## Contributing

[Include contribution guidelines here]

## License

[Include license information here]