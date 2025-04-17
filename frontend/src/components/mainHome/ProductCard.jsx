import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaHeart, FaShoppingBag, FaRegHeart, FaSpinner, FaImage } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

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

  const handleAddToCart = async () => {
    try {
      setIsAddingToCart(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
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

  return (
    <div 
      className="max-w-sm rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
      style={{ backgroundColor: product.backgroundColor }}
    >
      <div className="relative h-64 group">
        {imageUrl && !imageError ? (
          <>
            <img 
              src={imageUrl} 
              alt={product.name}
              className={`w-full h-full object-cover transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              crossOrigin="anonymous"
            />
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                <FaSpinner className="animate-spin text-gray-500 text-2xl" />
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200">
            <FaImage className="text-gray-400 text-4xl mb-2" />
            <span className="text-gray-500 text-sm">No Image Available</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
      </div>
      
      <div className="px-6 py-4" style={{ color: product.foregroundColor }}>
        <div className="font-bold text-xl mb-2 truncate">{product.name}</div>
        <p className="text-gray-700 text-base mb-2 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold">₹{product.price.toLocaleString()}</span>
          <span className={`text-sm ${product.countInStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.countInStock > 0 ? `In Stock: ${product.countInStock}` : 'Out of Stock'}
          </span>
        </div>
        
        <div className="flex justify-between space-x-2">
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart || product.countInStock === 0}
            className={`flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center space-x-2 transition-colors duration-200 ${
              isAddingToCart || product.countInStock === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isAddingToCart ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <>
                <FaShoppingCart />
                <span>Add to Cart</span>
              </>
            )}
          </button>
          
          <button
            onClick={handleAddToWishlist}
            className={`flex-1 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center space-x-2 transition-colors duration-200 ${
              isInWishlist ? 'bg-red-500 hover:bg-red-600' : ''
            }`}
          >
            {isInWishlist ? <FaHeart /> : <FaRegHeart />}
            <span>{isInWishlist ? 'Added' : 'Wishlist'}</span>
          </button>
          
          <button
            onClick={handleBuyNow}
            disabled={product.countInStock === 0}
            className={`flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center space-x-2 transition-colors duration-200 ${
              product.countInStock === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <FaShoppingBag />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 