// src/config/morgan.ts
import morgan from "morgan";
import { createStream } from "rotating-file-stream";
import path from "path";
import { Express, Request, Response } from "express";

// Create a rotating write stream
const accessLogStream = createStream("app.log", {
    interval: "1d", // rotate daily
    path: path.join(__dirname, "../../logs"),
});

// Custom function to skip logging Swagger requests
const skipSwagger = (req: Request, res: Response) => {
    return req.originalUrl.startsWith('/api-docs');
};

// Custom format function to remove color codes
const formatWithoutColors = (tokens: any, req: Request, res: Response) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ');
};

export const setupLogging = (app: Express) => {
    // Setup morgan to log to file without colors, skipping Swagger requests
    app.use(
        morgan(formatWithoutColors, {
            stream: accessLogStream,
            skip: skipSwagger
        })
    );

    // Setup morgan to log to console with colors, skipping Swagger requests
    app.use(
        morgan("dev", {
            skip: skipSwagger,
            // @ts-ignore (morgan types are not up to date)
            immediate: false  // Log after response is sent
        })
    );
};