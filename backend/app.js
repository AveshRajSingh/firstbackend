import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("hello");
})

app.listen(3000, () => {
  console.log("app is listening on port 3000")
}).on('error', (err) => {
  console.error('Error starting server:', err)
})