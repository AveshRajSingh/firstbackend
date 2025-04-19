import React from 'react';
import { motion } from 'framer-motion';

const Orders = () => {
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
      <h3 className="text-xl font-bold mb-4">Your Orders</h3>
      <div className="space-y-4">
        {/* Sample order items - replace with actual data */}
        {[1, 2, 3].map((order) => (
          <div key={order} className="bg-[rgba(255,255,255,0.05)] p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Order #{order}</p>
                <p className="text-sm text-gray-400">Placed on {new Date().toLocaleDateString()}</p>
              </div>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                Delivered
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Orders; 