import React from 'react';
import { motion } from 'framer-motion';

const Settings = () => {
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
      <h3 className="text-xl font-bold mb-4">Settings</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-[rgba(255,255,255,0.05)] rounded-lg">
          <div>
            <h4 className="font-semibold">Email Notifications</h4>
            <p className="text-sm text-gray-400">Receive updates about your orders</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="flex items-center justify-between p-4 bg-[rgba(255,255,255,0.05)] rounded-lg">
          <div>
            <h4 className="font-semibold">Two-Factor Authentication</h4>
            <p className="text-sm text-gray-400">Add an extra layer of security</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
            Enable
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings; 