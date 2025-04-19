import React, { useContext } from 'react';
import { ShoppingBag, User, ShoppingCart, Heart, LogOut, Home } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useContext(UserContext);

  const handleUserClick = () => {
    if (user?.isAdmin) {
      navigate('/admin');
    } else {
      navigate('/profile');
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const handleLogoClick = () => {
    navigate('/products');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white/10 backdrop-blur-lg shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div 
            className="flex items-center cursor-pointer"
            onClick={handleLogoClick}
          >
            <ShoppingBag className="h-6 w-6 text-blue-500" />
            <span className="ml-2 text-xl font-bold text-red-500">bagStation</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/products')}
              className={`p-2 rounded-lg transition-colors ${
                isActive('/products') 
                  ? 'bg-blue-600 text-white' 
                  : 'text-black hover:bg-white/10'
              }`}
            >
              <Home className="h-6 w-6" />
            </button>
            
            <button 
              onClick={() => navigate('/profile/cart')}
              className={`p-2 rounded-lg transition-colors relative ${
                location.pathname === '/profile/cart'
                  ? 'bg-blue-600 text-white'
                  : 'text-black hover:bg-white/10'
              }`}
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {user?.cartItems?.length || 0}
              </span>
            </button>
            
            <button 
              onClick={() => navigate('/profile/wishlist')}
              className={`p-2 rounded-lg transition-colors relative ${
                location.pathname === '/profile/wishlist'
                  ? 'bg-blue-600 text-white'
                  : 'text-black hover:bg-white/10'
              }`}
            >
              <Heart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {user?.wishlistItems?.length || 0}
              </span>
            </button>
            
            <button
              onClick={handleUserClick}
              className={`p-2 rounded-lg transition-colors ${
                location.pathname.startsWith('/profile') || location.pathname.startsWith('/admin')
                  ? 'bg-blue-600 text-white'
                  : 'text-black hover:bg-white/10'
              }`}
            >
              <User className="h-6 w-6" />
            </button>

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;