import React from 'react';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Navbar from '../mainHome/Navbar';
import HomePage from '../Home/HomePage';

const Layout = () => {

  const location = useLocation();
  if (location.pathname === '/') {
    return <HomePage />; // Render HomePage component for the root path
  }
  if (location.pathname === '/login' || location.pathname === '/register') {
    return <Outlet />; // Render the Outlet for login and register paths
  }
  return (
    <div>
      <Navbar />
      <div className="pt-16"> {/* Add padding top to account for fixed navbar */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout; 