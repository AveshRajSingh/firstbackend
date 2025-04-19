import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext.jsx";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { user, setUser, loading, setLoading, error, setError } =
    useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginClick = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warning("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Login response:", response.data.data);

      if (response?.data?.data) {
        setUser(response.data.data);
        toast.success("Login successful");
        setEmail("");
        setPassword("");
        navigate("/products");
      } else {
        setError("Login failed");
        toast.error("Login failed");
      }
    } catch (err) {
      console.error("Error during login:", err.response?.data);
      const errorMessage = err.response?.data?.message || "Something went wrong";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: { duration: 0.5 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-gray-900 via-purple-900 to-violet-900 text-white relative overflow-hidden">
        <ToastContainer
          position="top-right"
        autoClose={3000}
          hideProgressBar={false}
        newestOnTop={true}
          closeOnClick
          rtl={false}
          draggable
        theme="dark"
        style={{ zIndex: 9999 }}
      />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ top: '10%', left: '20%' }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ bottom: '10%', right: '20%' }}
        />
      </div>

      <motion.div 
        className="relative flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
      >
        <motion.h1 
          className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Login to Account
        </motion.h1>

        <motion.div 
          className="w-full max-w-md space-y-6 bg-white/5 p-8 rounded-2xl backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/10"
          variants={containerVariants}
        >
          {error && (
            <motion.p 
              className="text-red-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {error.message}
            </motion.p>
          )}

          {[
            { value: email, setter: setEmail, placeholder: "Email", type: "email", icon: "📧" },
            { value: password, setter: setPassword, placeholder: "Password", type: "password", icon: "🔒" }
          ].map((field, index) => (
            <motion.div
              key={index}
              className="relative"
              variants={itemVariants}
            >
              <motion.span
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                whileHover={{ scale: 1.2 }}
              >
                {field.icon}
              </motion.span>
              <motion.input
                className="w-full pl-12 pr-4 py-3 bg-[rgba(255,255,255,0.05)] rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-black placeholder-gray-500 hover:text-black focus:text-black"
                type={field.type}
                placeholder={field.placeholder}
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                whileFocus={{ scale: 1.02 }}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              />
            </motion.div>
          ))}

          <motion.div 
            className="flex gap-4"
            variants={itemVariants}
          >
            <motion.button
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-blue-500/30 relative overflow-hidden"
              onClick={(e) => {
                handleLoginClick(e);
              }}
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="button"
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <motion.div
                      className="w-5 h-5 border-2 border-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Logging in...
                  </motion.span>
                ) : (
                  <motion.span
                    key="text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Login
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            <motion.button
              className="flex-1 bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-purple-500/30"
              onClick={() => navigate("/register")}
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(147, 51, 234, 0.5)" }}
              whileTap={{ scale: 0.98 }}
            >
              Register
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
