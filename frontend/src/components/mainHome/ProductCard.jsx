import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaHeart, FaShoppingBag, FaRegHeart, FaSpinner, FaImage } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios';

const ProductCard = ({ product }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [showQuantitySelector, setShowQuantitySelector] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product.imageUrl) {
      if (product.imageUrl.includes('cloudinary.com')) {
        const optimizedUrl = product.imageUrl.replace('/upload/', '/upload/q_auto,f_auto/');
        setImageUrl(optimizedUrl);
      } else {
        setImageUrl(product.imageUrl);
      }
    }
  }, [product.imageUrl]);

  const handleQuantityChange = (increment) => {
    setQuantity(prev => {
      const newQuantity = prev + increment;
      if (newQuantity < 1 || newQuantity > product.countInStock) {
        return prev;
      }
      return newQuantity;
    });
  };

  const addToCart = async() => {
    try {
      setIsAddingToCart(true);
      const response = await axios.post('http://localhost:3000/api/v1/cart/add', {
        productId: product._id,
        quantity,
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },  
      });
      console.log("Product added to cart:", response.data);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  }

  const handleAddToCart = async () => {
    // If stock is 1, directly add to cart without showing quantity selector
    if (product.countInStock <= 1) {
      addToCart();
      setShowQuantitySelector(false);
      return;
    }

    if (!showQuantitySelector) {
      setShowQuantitySelector(true);
      return;
    }
     addToCart();
    setShowQuantitySelector(false);
  };

  const handleAddToWishlist = () => {
    setIsInWishlist(!isInWishlist);
  };

  const handleBuyNow = () => {
    // Implement buy now functionality
  };

  const handleImageError = () => {
    setImageError(true);
    setIsImageLoading(false);
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  // Helper function to validate color
  const isValidColor = (color) => {
    return color && (color.match(/^#([A-Fa-f0-9]{3}){1,2}$/) || color.match(/^rgb/));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
      style={{backgroundColor: isValidColor(product.backgroundColor) ? product.backgroundColor : '#fff'}}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {imageUrl && !imageError ? (
          <>
            <motion.img 
              src={imageUrl} 
              alt={product.name}
              className="w-full h-full object-cover"
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: isImageLoading ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              onLoad={handleImageLoad}
              onError={handleImageError}
              crossOrigin="anonymous"
            />
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <FaSpinner className="animate-spin text-gray-400 text-3xl" />
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <FaImage className="text-gray-400 text-5xl mb-3" />
            <span className="text-gray-500 text-sm font-medium">No Image Available</span>
          </div>
        )}
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleAddToWishlist}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-colors duration-200"
        >
          {isInWishlist ? (
            <FaHeart className="text-red-500 text-xl" />
          ) : (
            <FaRegHeart className="text-gray-600 text-xl" />
          )}
        </motion.button>
      </div>
      
      <div className="p-5">
        <div className="mb-3">
          <h3 className="font-bold text-xl text-gray-800 mb-1 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 h-10">
            {product.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-900">
              ₹{product.price.toLocaleString()}
            </span>
            <span className={`text-sm ${product.countInStock > 0 ? 'text-green-600' : 'text-red-500'} font-medium`}>
              {product.countInStock > 0 ? `${product.countInStock} in stock` : 'Out of Stock'}
            </span>
          </div>
          <div className="flex gap-2 items-center relative">
            {/* Use absolute positioning for quantity selector to prevent layout shift */}
            {showQuantitySelector && !isAddingToCart && product.countInStock > 1 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, x: 0 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 0 }}
                className="absolute right-full mr-2 bg-white shadow-lg rounded-lg p-1 border border-gray-200"
              >
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleQuantityChange(-1)}
                    className={`w-8 h-8 flex items-center justify-center rounded-md ${
                      quantity <= 1 ? 'bg-gray-200 text-gray-400' : 'bg-blue-500 text-white hover:bg-blue-600'
                    } transition-colors duration-200`}
                    disabled={quantity <= 1}
                  >
                    -
                  </motion.button>
                  <span className="w-8 text-center font-medium text-gray-700">{quantity}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleQuantityChange(1)}
                    className={`w-8 h-8 flex items-center justify-center rounded-md ${
                      quantity >= product.countInStock ? 'bg-gray-200 text-gray-400' : 'bg-blue-500 text-white hover:bg-blue-600'
                    } transition-colors duration-200`}
                    disabled={quantity >= product.countInStock}
                  >
                    +
                  </motion.button>
                </div>
              </motion.div>
            )}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isAddingToCart || product.countInStock === 0}
              onClick={handleAddToCart}
              className={`p-3 rounded-full ${
                isAddingToCart || product.countInStock === 0 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : showQuantitySelector
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-blue-500 text-white hover:bg-blue-600'
              } transition-colors duration-200`}
            >
              {isAddingToCart ? (
                <FaSpinner className="animate-spin text-xl" />
              ) : (
                <FaShoppingCart className="text-xl" />
              )}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={product.countInStock === 0}
              onClick={handleBuyNow}
              className={`px-4 py-2 rounded-full ${
                product.countInStock === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-green-500 text-white hover:bg-green-600'
              } transition-colors duration-200 flex items-center gap-2`}
            >
              <FaShoppingBag />
              <span className="font-medium">Buy Now</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;