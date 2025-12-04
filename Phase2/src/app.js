import express from "express";
import cors from "cors";
import morgan from "morgan";

import { notFoundHandler } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import todoRouter from "./routes/todo.routes.js";
import uploadRouter from "./routes/upload.routes.js";

export const app = express();

// ---- Global Middlewares ----
app.use(cors());
app.use(express.json()); // JSON body parse
app.use(morgan("dev"));  // logging

// Static files (uploaded files serve karne ke liye)
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ---- Routes ----
app.use("/api/v1/todos", todoRouter);
app.use("/api/v1/upload", uploadRouter);

// 404 handler (agar koi route match nahi hua)
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);
