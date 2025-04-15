

import mongoose from "mongoose";
import { Cart } from "../model/cart.model.js";

const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }

    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty <= 0) {
        return res.status(400).json({ message: "Quantity must be a positive number" });
    }

    try {
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            // You can choose to create a new cart here
            cart = new Cart({ user: userId, cartItems: [] });

        }

        const productIndex = cart.cartItems.findIndex(
            item => item.product.toString() === productId
        );

        if (productIndex !== -1) {
            cart.cartItems[productIndex].quantity += qty;
        } else {
            cart.cartItems.push({ product: productId, quantity: qty });
        }

        await cart.save();
        return res.status(200).json({ message: "Product added to cart", cart });

    } catch (error) {
        console.error("Error adding to cart:", error);
        return res.status(500).json({
            message: "Error adding to cart",
            error: error.message,
        });
    }
};


const getCart = async (req, res) => {
    const userId = req.user._id;
    try {
        const cart = await Cart.findOne({ user: userId })
            .populate("cartItems.product", "name price imageUrl");

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Remove items with null products (just in case)
        cart.cartItems = cart.cartItems.filter(item => item.product);

        return res.status(200).json({ cart });
    } catch (error) {
        console.error("Error getting cart:", error);
        return res.status(500).json({
            message: "Error getting cart",
            error: error.message,
        });
    }
};


export { addToCart, getCart };
