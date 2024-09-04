import swaggerJSDoc from "swagger-jsdoc";
import { version } from '../../package.json';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Chart generator API",
            version: version,
            description: "Microservice to generate charts using amCharts",
        },
        servers: [
            {
                url: "http://localhost:3001",
                description: "Development server",
            },
        ],
        apis: ["./src/routes/*.ts"],
    }
}

export const swaggerSpec = swaggerJSDoc(options);