import 'reflect-metadata';
import express from 'express';
import { useExpressServer } from 'routing-controllers';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import swaggerUi from 'swagger-ui-express';
import { ExampleController } from './controllers/ExampleController';
import { setupLogging } from "./config/morgan";

const app = express();

// Setup morgan logger
setupLogging(app);

// Setup routing-controllers
const routingControllersOptions = {
    controllers: [ExampleController],
};

useExpressServer(app, routingControllersOptions);

// Generate API spec
const storage = getMetadataArgsStorage();
const spec = routingControllersToSpec(storage, routingControllersOptions, {
    info: {
        title: 'Express TypeScript Microservice API',
        version: '1.0.0',
        description: 'A simple Express TypeScript microservice API',
    },
});

// Setup Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
});