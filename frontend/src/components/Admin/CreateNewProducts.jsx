import React, { useState } from "react";
import axios from "axios";
import { FaSpinner, FaImage, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const CreateNewProducts = () => {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        countInStock: "",
        imageUrl: "",
        backgroundColor: "#ffffff",
        foregroundColor: "#000000",
        category: ""
    });
    
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        
        if (name === 'imageUrl' && files && files[0]) {
            const file = files[0];
            setFormData(prev => ({ ...prev, imageUrl: file }));
            
            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            setFormData(prev => ({ ...prev, imageUrl: file }));
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            toast.error('Please drop an image file');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                formDataToSend.append(key, formData[key]);
            });

            const response = await axios.post("/api/products", formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            toast.success('Product created successfully!');
            setFormData({
                name: "",
                price: "",
                description: "",
                countInStock: "",
                imageUrl: "",
                backgroundColor: "#ffffff",
                foregroundColor: "#000000",
                category: ""
            });
            setPreviewImage(null);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8"
        >
            <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold mb-8 text-gray-800"
            >
                Create New Product
            </motion.h2>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            required
                            placeholder="Enter product name"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            required
                            min="0"
                            step="0.01"
                            placeholder="Enter price"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                        <input
                            type="number"
                            name="countInStock"
                            value={formData.countInStock}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            required
                            min="0"
                            placeholder="Enter stock quantity"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            required
                            placeholder="Enter category"
                        />
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        rows="3"
                        required
                        placeholder="Enter product description"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                    <div
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        {previewImage ? (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="relative"
                            >
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="max-h-48 mx-auto rounded-lg shadow-md"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setPreviewImage(null);
                                        setFormData(prev => ({ ...prev, imageUrl: "" }));
                                    }}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                >
                                    <FaPlus className="rotate-45" />
                                </button>
                            </motion.div>
                        ) : (
                            <div className="space-y-4">
                                <FaImage className="mx-auto text-gray-400 text-4xl" />
                                <p className="text-gray-500">Drag and drop an image here, or click to select</p>
                                <input
                                    type="file"
                                    name="imageUrl"
                                    onChange={handleChange}
                                    accept="image/*"
                                    className="hidden"
                                    id="image-upload"
                                />
                                <label
                                    htmlFor="image-upload"
                                    className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
                                >
                                    Select Image
                                </label>
                            </div>
                        )}
                    </div>
                </motion.div>

                <div className="grid grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                    >
                        <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
                        <div className="flex items-center space-x-4">
                            <input
                                type="color"
                                name="backgroundColor"
                                value={formData.backgroundColor}
                                onChange={handleChange}
                                className="w-12 h-12 rounded-lg cursor-pointer"
                            />
                            <span className="text-gray-500">{formData.backgroundColor}</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                    >
                        <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
                        <div className="flex items-center space-x-4">
                            <input
                                type="color"
                                name="foregroundColor"
                                value={formData.foregroundColor}
                                onChange={handleChange}
                                className="w-12 h-12 rounded-lg cursor-pointer"
                            />
                            <span className="text-gray-500">{formData.foregroundColor}</span>
                        </div>
                    </motion.div>
                </div>

                <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 px-6 rounded-lg text-white font-medium flex items-center justify-center ${
                        loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    } transition-all duration-200`}
                >
                    {loading ? (
                        <>
                            <FaSpinner className="animate-spin mr-2" />
                            Creating...
                        </>
                    ) : (
                        'Create Product'
                    )}
                </motion.button>
            </form>
        </motion.div>
    );
};

export default CreateNewProducts;

