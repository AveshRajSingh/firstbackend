import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { connectDb } from "./db/index.js";
import cors from "cors";
dotenv.config()
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
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

import adminRouter from "./routes/admin.route.js"

app.use("/api/v1/admin",adminRouter)

import productRouter from "./routes/product.route.js"

app.use("/api/v1/products",productRouter)

import cartRouter from "./routes/cart.route.js"

app.use("/api/v1/cart", cartRouter)

import wishlistRouter from "./routes/wishlist.route.js"

app.use("/api/v1/wishlist", wishlistRouter)