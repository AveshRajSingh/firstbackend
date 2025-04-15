import Wishlist from "../model/wishlist.model.js";

export const addToWishlist = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  try {
    let wishlist = await Wishlist.findOne({ user: userId });

    if (wishlist) {
      const alreadyExists = wishlist.products.some(
        (p) => p.toString() === productId
      );

      if (alreadyExists) {
        return res.status(400).json({ message: "Product already in wishlist" });
      }

      wishlist.products.push(productId);
      await wishlist.save();

      return res.status(200).json({
        message: "Product added to wishlist",
        wishlist,
      });
    } else {
      const newWishlist = new Wishlist({
        user: userId,
        products: [productId],
      });

      await newWishlist.save();

      return res.status(200).json({
        message: "Product added to wishlist",
        wishlist: newWishlist,
      });
    }
  } catch (error) {
    console.error("Wishlist Add Error:", error);
    return res.status(500).json({
      message: "Error adding product to wishlist",
      error: error.message,
    });
  }
};

// Get wishlist
const getWishList = async (req, res) => {
    const userId = req.user._id;
  
    try {
      const wishlist = await Wishlist.findOne({ user: userId }).populate("products");
  
      if (!wishlist) {
        return res.status(200).json({ wishlist: [] }); // No wishlist yet
      }
  
      return res.status(200).json({ wishlist: wishlist.products });
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      return res.status(500).json({
        message: "Error getting wishlist",
        error: error.message,
      });
    }
  };

  const removeFromWishlist = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user._id;
  
    try {
      const wishlist = await Wishlist.findOne({ user: userId });
  
      if (!wishlist) {
        return res.status(404).json({ message: "Wishlist not found" });
      }
  
      // Use filter to remove the product (safe and readable)
      const initialLength = wishlist.products.length;
  
      wishlist.products = wishlist.products.filter(
        (p) => p.toString() !== productId
      );
  
      if (wishlist.products.length === initialLength) {
        return res.status(404).json({ message: "Product not found in wishlist" });
      }
  
      await wishlist.save();
  
      return res.status(200).json({
        message: "Product removed from wishlist",
        wishlist,
      });
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
      return res.status(500).json({
        message: "Error removing product from wishlist",
        error: error.message,
      });
    }
  };

  const clearWishlist = async (req, res) => {
    const userId = req.user._id;

    try {
      const wishlist = await Wishlist.findOne({ user: userId });

      if (!wishlist) {
        return res.status(404).json({ message: "Wishlist not found" });
      }

      if (wishlist.products.length === 0) {
        return res.status(200).json({ message: "Wishlist is already empty" });
      }

      wishlist.products = [];
      await wishlist.save();

      return res.status(200).json({
        message: "Wishlist cleared",
        wishlist,
      });
    } catch (error) {
      console.error("Error clearing wishlist:", error);
      return res.status(500).json({
        message: "Error clearing wishlist",
        error: error.message,
      });
    }
  };   
  const isInWishList = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user._id;
      try {
        const wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }
        if(wishlist.products.length === 0) {
            return res.status(200).json({ message: "Wishlist is empty" });
        }
        const isInWishlist = wishlist.products.some(
            (p) => p.toString() === productId
        );  
        return res.status(200).json({ isInWishlist });
        
        
        
      } catch (error) {
        console.error("Error checking if product is in wishlist:", error);
        return res.status(500).json({
            message: "Error checking if product is in wishlist",
            error: error.message,
        });
      } 
  }
  
  
export { addToWishlist, getWishList, removeFromWishlist, clearWishlist, isInWishList };
