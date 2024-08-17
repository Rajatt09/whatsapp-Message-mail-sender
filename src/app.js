import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50kb" }));
app.use(express.static("public"));

app.use(cookieParser());

//routes import

import messageRouter from "./routes/message.routes.js";

//routes declaration

app.use("/api/v1/message", messageRouter);

export { app };
