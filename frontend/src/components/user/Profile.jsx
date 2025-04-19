import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaShoppingCart, FaHeart, FaBox, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    contact: user?.contact || '',
    username: user?.username || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    // Add your profile update logic here
    setIsEditing(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const tabs = [
    { id: 'profile', icon: <FaUser />, label: 'Profile' },
    { id: 'orders', icon: <FaBox />, label: 'Orders' },
    { id: 'cart', icon: <FaShoppingCart />, label: 'Cart' },
    { id: 'wishlist', icon: <FaHeart />, label: 'Wishlist' },
    { id: 'settings', icon: <FaCog />, label: 'Settings' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <motion.div
            className="bg-white/5 p-6 rounded-xl backdrop-blur-xl"
            variants={itemVariants}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <img
                  src={user?.picture || 'https://via.placeholder.com/150'}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-blue-500/30"
                />
                <button className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition">
                  <FaCog className="text-white" />
                </button>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <p className="text-gray-400">{user?.email}</p>
              </div>
            </div>

            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Contact</label>
                    <input
                      type="text"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Name</p>
                    <p className="text-lg">{user?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-lg">{user?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Contact</p>
                    <p className="text-lg">{user?.contact || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Username</p>
                    <p className="text-lg">{user?.username}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </motion.div>
        );

      case 'orders':
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

      case 'cart':
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

      case 'wishlist':
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

      case 'settings':
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

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-gray-900 via-purple-900 to-violet-900 text-white p-4 md:p-8">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <motion.div
            className="bg-white/5 p-6 rounded-xl backdrop-blur-xl h-fit"
            variants={itemVariants}
          >
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:bg-white/5'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
              <button
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="md:col-span-3"
            variants={itemVariants}
          >
            {renderTabContent()}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
