import React, { useState } from 'react';
import { FaBox, FaPlus, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import { Outlet, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import AllAdminProduct from './AllAdminProduct';
import CreateNewProducts from './CreateNewProducts';
import CreateAdmin from './CreateAdmin';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('products');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement logout functionality
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    navigate(`/admin/${tab}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
          <nav className="space-y-2">
            <button
              onClick={() => handleTabClick('products')}
              className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'products' ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
            >
              <FaBox />
              <span>All Products</span>
            </button>
            <button
              onClick={() => handleTabClick('create')}
              className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'create' ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
            >
              <FaPlus />
              <span>Create Product</span>
            </button>
            <button
              onClick={() => handleTabClick('admin')}
              className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'admin' ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
            >
              <FaUserPlus />
              <span>Create Admin</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
