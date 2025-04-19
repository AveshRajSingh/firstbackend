import React from 'react';
import { motion } from 'framer-motion';

const Cart = () => {
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
      <h3 className="text-xl font-bold mb-4">Your Cart</h3>
      <div className="space-y-4">
        {/* Sample cart items - replace with actual data */}
        {[1, 2].map((item) => (
          <div key={item} className="flex items-center gap-4 bg-[rgba(255,255,255,0.05)] p-4 rounded-lg">
            <img
              src="https://via.placeholder.com/100"
              alt="Product"
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h4 className="font-semibold">Product Name</h4>
              <p className="text-gray-400">$99.99</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 bg-gray-600 rounded-lg hover:bg-gray-700">-</button>
              <span>1</span>
              <button className="p-2 bg-gray-600 rounded-lg hover:bg-gray-700">+</button>
            </div>
            <button className="p-2 text-red-500 hover:text-red-600">
              Remove
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Cart; 