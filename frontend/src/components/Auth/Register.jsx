import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import "react-toastify/dist/ReactToastify.css";

const Register = ({ registerRef }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !contact || !username) {
      toast.warning("Please fill all the fields");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("contact", contact);
    formData.append("username", username);
    if (image) {
      formData.append("picture", image);
    }
  
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.data.statusCode === 200) {
        toast.success("User created successfully");
        setName("");
        setEmail("");
        setPassword("");
        setContact("");
        setUsername("");
        setImage(null);
        setPreview(null);
        navigate("/products");
      }
    } catch (error) {
      console.log("Error during registration:", error);
      if (error.message === "Network Error") {
        toast.error("Server is down");
      } else if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
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

  const dropzoneVariants = {
    hover: { 
      scale: 1.02,
      boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-gray-900 via-purple-900 to-violet-900 text-white relative overflow-hidden" ref={registerRef}>
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
          Create Account
        </motion.h1>

        <motion.div 
          className="w-full max-w-md space-y-6 bg-white/5 p-8 rounded-2xl backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/10"
          variants={containerVariants}
        >
          {/* Image Upload Section */}
          <motion.div 
            {...getRootProps()} 
            variants={dropzoneVariants}
            whileHover="hover"
            className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all duration-300 ${
              isDragActive ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600 hover:border-blue-500'
            }`}
          >
            <input {...getInputProps()} />
            <AnimatePresence mode="wait">
              {preview ? (
                <motion.div 
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.img 
                    src={preview} 
                    alt="Preview" 
                    className="w-32 h-32 object-cover rounded-full mb-2 ring-4 ring-blue-500/30"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                  />
                  <p className="text-sm text-gray-400">Click or drag to change image</p>
                </motion.div>
              ) : (
                <motion.div 
                  className="py-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="text-gray-400">Drag & drop your profile image here</p>
                  <p className="text-sm text-gray-500">or click to select</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Input Fields */}
          {[
            { value: name, setter: setName, placeholder: "Full Name", type: "text", icon: "👤" },
            { value: username, setter: setUsername, placeholder: "Username", type: "text", icon: "📝" },
            { value: email, setter: setEmail, placeholder: "Email", type: "email", icon: "📧" },
            { value: password, setter: setPassword, placeholder: "Password", type: "password", icon: "🔒" },
            { value: contact, setter: setContact, placeholder: "Contact", type: "number", icon: "📱" }
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

          {/* Buttons */}
          <motion.div 
            className="flex gap-4"
            variants={itemVariants}
          >
            <motion.button
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-blue-500/30 relative overflow-hidden"
              onClick={handleSubmit}
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
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
                    Processing...
                  </motion.span>
                ) : (
                  <motion.span
                    key="text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
            >
              Register
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            <motion.button
              className="flex-1 bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-purple-500/30"
              onClick={() => navigate("/login")}
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(147, 51, 234, 0.5)" }}
              whileTap={{ scale: 0.98 }}
            >
              Login
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;
