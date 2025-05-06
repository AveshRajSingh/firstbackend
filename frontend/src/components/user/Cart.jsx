import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CartContext } from "../../context/CartContext";

const Cart = () => {
  const { cart, fetchCart,removeFromCart } = useContext(CartContext);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editQuantity, setEditQuantity] = useState(1);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        await fetchCart();
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    fetchCartData();
  }, []);

  const cartItems = cart?.cartItems || [];
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };


  const handleRemoveClick = async(productId,cartId) => {
    await removeFromCart(productId,cartId);//removing the item from cart
   // await fetchCart();//fetching the cart again to update the UI
  };

  const handleIncrease = (idx) => {
    if (cartItems[idx].quantity < (cartItems[idx].product?.countInStock || 99)) {
      setEditQuantity(cartItems[idx].quantity + 1);
      setEditingIndex(idx);
    }
  };

  const handleDecrease = (idx) => {
    if (cartItems[idx].quantity > 1) {
      setEditQuantity(cartItems[idx].quantity - 1);
      setEditingIndex(idx);
    }
  };

  return (
    <motion.div
      className="bg-white/5 p-6 rounded-xl backdrop-blur-xl"
      variants={itemVariants}
    >
      <h3 className="text-xl font-bold mb-4">Your Cart</h3>
      <div className="space-y-4">
        {cartItems.length === 0 && (
          <div className="text-gray-400 text-center">Your cart is empty.</div>
        )}
        {cartItems.map((item, idx) => (
          <div
            key={item.product?._id || idx}
            className="flex items-center gap-4 bg-[rgba(255,255,255,0.05)] p-4 rounded-lg"
          >
            <div className="w-20 h-20 flex items-center justify-center bg-gray-200 rounded-lg overflow-hidden">
              {item.product?.imageUrl ? (
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-xs">No Image</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-black truncate">{item.product?.name || "Unknown Product"}</h4>
              <p className="text-gray-400">{item.product?.price ? `₹${item.product.price}` : "No price"}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="p-2 bg-gray-600 rounded-lg hover:bg-gray-700"
                onClick={() => handleDecrease(idx)}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="w-8 text-black text-center">{editingIndex === idx ? editQuantity : item.quantity}</span>
              <button
                className="p-2 bg-gray-600 rounded-lg hover:bg-gray-700"
                onClick={() => handleIncrease(idx)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button
            onClick={() => handleRemoveClick(item.product._id,cart._id)}
             className="p-2 text-red-500 hover:text-red-600">
              Remove
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Cart;
