

import mongoose from "mongoose";
import { Cart } from "../model/cart.model.js";

const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }

    try {
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            // You can choose to create a new cart here
            cart = new Cart({ user: userId, cartItems: [] });

        }

        const productIndex = cart.cartItems.findIndex(
            item => item.product.toString() === productId.toString()
        );

        if (productIndex !== -1) {
            cart.cartItems[productIndex].quantity += quantity;
        } else {
            cart.cartItems.push({ product: productId, quantity: quantity });
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
            .populate({path: "cartItems.product", model: "Product"});
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Remove items with null products (just in case)
        cart.cartItems = cart.cartItems.filter(item => item.product);

        return res.status(200).json({ cart, message:"cart fetch successful" });
    } catch (error) {
        console.error("Error getting cart:", error);
        return res.status(500).json({
            message: "Error getting cart",
            error: error.message,
        });
    }
};

const removeFromCart = async (req, res) => {
    const { cartId, productId } = req.body;

    try {
        const initialCart = await Cart.findById(cartId); // Fixed: use Cart model and await

        if (!initialCart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const productIndex = initialCart.cartItems.findIndex(
            item => item.product && item.product.toString() === productId.toString()
          );

        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        initialCart.cartItems.splice(productIndex, 1);
       
        await initialCart.save();

        const cart = await Cart.findById(cartId).populate("cartItems.product")

       return res.status(200).json({ message: "Product removed from cart", cart });


    } catch (error) {
        console.error("Error while deleting from cart:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



export { addToCart, getCart,removeFromCart };
