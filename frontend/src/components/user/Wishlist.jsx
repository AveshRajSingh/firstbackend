import React from 'react';
import { motion } from 'framer-motion';

const Wishlist = () => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.div
      className="bg-white/5 p-6 rounded-xl backdrop-blur-xl"
      variants={itemVariants}
    >
      <h3 className="text-xl font-bold mb-4">Your Wishlist</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Sample wishlist items - replace with actual data */}
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="bg-[rgba(255,255,255,0.05)] p-4 rounded-lg">
            <img
              src="https://via.placeholder.com/200"
              alt="Product"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h4 className="font-semibold">Product Name</h4>
            <p className="text-gray-400 mb-2">$99.99</p>
            <button className="w-full py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Wishlist; 