import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { motion } from "framer-motion";
import {
  FaUser,
  FaShoppingCart,
  FaHeart,
  FaBox,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  if (
    user === null ||
    user === undefined ||
    user === "" ||
    Object.keys(user).length === 0
  ) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontFamily: "sans-serif",
          color: "#333",
          flexDirection: "column",
        }}
      >
        <h2 style={{ marginBottom: "0.5rem" }}>🚫 Access Denied</h2>
        <p style={{ marginBottom: "1rem" }}>Please log in to continue.</p>
        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4f46e5",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Login
        </button>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const tabs = [
    { id: "profile", icon: <FaUser />, label: "Profile", path: "/profile" },
    { id: "orders", icon: <FaBox />, label: "Orders", path: "/profile/orders" },
    {
      id: "cart",
      icon: <FaShoppingCart />,
      label: "Cart",
      path: "/profile/cart",
    },
    {
      id: "wishlist",
      icon: <FaHeart />,
      label: "Wishlist",
      path: "/profile/wishlist",
    },
    {
      id: "settings",
      icon: <FaCog />,
      label: "Settings",
      path: "/profile/settings",
    },
  ];

  const handleLogout = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/v1/user/logout",
      {
        withCredentials: true,
      }
    );
    console.log(response);
    setUser(null);
    navigate("/");
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
                  onClick={() => navigate(tab.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    location.pathname === tab.path
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:bg-white/5"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div className="md:col-span-3" variants={itemVariants}>
            <Outlet />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
