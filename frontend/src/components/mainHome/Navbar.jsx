import React from 'react';
import { ShoppingBag, User, ShoppingCart, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ userData }) => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    console.log("User data:", userData);
    
    if (userData.data.isAdmin) {
      navigate('/admin');
    } else {
      navigate('/user');
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <ShoppingBag className="h-6 w-6 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">bagStation</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
              <ShoppingCart className="h-6 w-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
              <Heart className="h-6 w-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
            </button>
            <button
              onClick={handleUserClick}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <User className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;