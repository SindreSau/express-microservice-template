// Setup for Morgan logging middleware
import morgan from "morgan";
import { createStream } from "rotating-file-stream";
import path from "path";
import {Express} from "express";

// Create a rotating write stream
const accessLogStream = createStream("app.log", {
    interval: "1d", // rotate daily
    path: path.join(__dirname, "../../logs"),
});

export const setupLogging = (app: Express) => {
    // Setup morgan to use the rotating file stream
    app.use(
        morgan("tiny", {
            stream: accessLogStream,
        })
    );

    // Optionally, also log to the console in a different format
    app.use(morgan("tiny"));
};
