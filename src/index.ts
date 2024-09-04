import express, { Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import dotenv from "dotenv";
import morgan from "morgan";
import {setupLogging} from "./config/morgan";

dotenv.config();

const app: Express = express();

// Swagger UI
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Morgan for logging
setupLogging(app);

const config = {
    port: parseInt(process.env.PORT || "3000", 10),
    host: process.env.HOST || "localhost",
};

//== Define routes here ==//
/**
 * @swagger
 * /:
 *  get:
 *  description: Test endpoint
 *  responses:
 *    '200':
 *    description: A successful response
 */
app.get("/", (req: Request, res: Response) => {
    res.send("Hello world!");
});

//== starts the server and listens for incoming requests ==//
app.listen(config.port, config.host, () => {
    console.log(`[server]: Server is running at http://${config.host}:${config.port}`);
    console.log(`[swagger]: Swagger UI is available at http://${config.host}:${config.port}/api-docs`);
});