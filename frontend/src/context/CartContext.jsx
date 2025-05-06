import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({cartItems: []});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showQuantitySelector, setShowQuantitySelector] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/v1/cart", {
        withCredentials: true,
      });
      if (response.status !== 200) {
        throw new Error("Failed to fetch cart data");
      }
      setCart(response.data.cart);
      setError(null);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to fetch cart";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId, cartId) => {
    try {
       const response = await axios.post(
        "http://localhost:3000/api/v1/cart/remove",
        {
          productId,
          cartId,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if(response){
        setCart(response.data.cart);
        toast.success(response.data.message || "Product removed from cart successfully!");
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error(
        error.response?.data?.message || "Failed to remove product from cart"
      );
      setError(
        error.response?.data?.message || "Failed to remove product from cart"
      );
    }
  };
  
  const addToCart = async (product) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/cart/add",
        {
          productId: product._id,
          quantity,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setCart(response.data.cart);
      toast.success("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error(
        error.response?.data?.message || "Failed to add product to cart"
      );
      setError(
        error.response?.data?.message || "Failed to add product to cart"
      );
    } finally {
      setQuantity(1); // Reset quantity
      setShowQuantitySelector(false);
    }
  };
 


  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        fetchCart,
        loading,
        setLoading,
        error,
        setError,
        showQuantitySelector,
        setShowQuantitySelector,
        quantity,
        setQuantity,
        removeFromCart,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
