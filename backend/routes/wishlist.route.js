import express from "express";
import {
  addToWishlist,
  getWishList,
  removeFromWishlist,
  clearWishlist,
  isInWishList,
} from "../controller/wishlist.controller.js";
import { verifyUser } from "../middleware/veryfyUser.js";

const router = express.Router();

// Add product to wishlist
router.post("/add", verifyUser, addToWishlist);

// Get user's wishlist
router.get("/", verifyUser, getWishList);

// Remove product from wishlist
router.post("/remove", verifyUser, removeFromWishlist);

// Clear wishlist
router.delete("/clear", verifyUser, clearWishlist);

// Check if product is in wishlist
router.post("/check", verifyUser, isInWishList);

export default router;
