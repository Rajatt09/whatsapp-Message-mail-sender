import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from './utils/dbConnection.js'

const app = express();

app.use(cors({

}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50kb" }));
app.use(express.static("public"));

app.use(cookieParser());
// mongo db connection

connectDB();

//routes import


import messageRouter from "./routes/message_routes.js";

//routes declaration

app.use("/api/v1/message", messageRouter);

export { app };
