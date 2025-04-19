import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../mainHome/Navbar';

const Layout = () => {
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