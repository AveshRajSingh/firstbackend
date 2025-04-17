import React, { useState } from 'react';
import { FaUserPlus, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';

const CreateAdmin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleCreateAdmin = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('/api/v1/admin/create', {
                email: formData.email,
                password: formData.password
            });

            if (response.status === 201) {
                toast.success('Admin account created successfully!');
                setFormData({
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create admin account');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Create Admin Account</h2>
                <p className="text-gray-600 mt-2">Create a new administrator account</p>
            </div>

            <form onSubmit={handleCreateAdmin} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                        placeholder="Enter email address"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                        placeholder="Enter password"
                        minLength="6"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                        placeholder="Confirm password"
                        minLength="6"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-4 rounded-md text-white font-medium flex items-center justify-center ${
                        loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    {loading ? (
                        <>
                            <FaSpinner className="animate-spin mr-2" />
                            Creating...
                        </>
                    ) : (
                        <>
                            <FaUserPlus className="mr-2" />
                            Create Admin
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default CreateAdmin;
