import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import { connectDb } from "./db/index.js";
dotenv.config()
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

connectDb()
.then(() =>{
    console.log("db is connected")
    app.listen(process.env.PORT, () => {
        console.log("app is listening on port 3000")
      }).on('error', (err) => {
        console.error('Error starting server:', err)
      })
})

import userRouter from "./routes/user.route.js"

app.use("/api/v1/user",userRouter)
