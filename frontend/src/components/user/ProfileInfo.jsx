import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { motion } from 'framer-motion';
import { FaCog } from 'react-icons/fa';

const ProfileInfo = () => {
  const { user } = useContext(UserContext);
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
          <h2 className="text-2xl font-bold text-black">{user?.name}</h2>
          <p className=" text-black">{user?.email}</p>
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
              <p className="text-lg text-black">{user?.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p className="text-lg text-black">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Contact</p>
              <p className="text-lg text-black">{user?.contact || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Username</p>
              <p className="text-lg text-black">{user?.username}</p>
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
};

export default ProfileInfo; 