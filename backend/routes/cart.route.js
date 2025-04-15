import express from "express";
import { addToCart, getCart } from "../controller/cart.controller.js";
import { verifyUser } from "../middleware/veryfyUser.js";

const router = express.Router();

// Add product to cart
router.post("/add", verifyUser, addToCart);

// Get user's cart
router.get("/", verifyUser, getCart);

export default router; 