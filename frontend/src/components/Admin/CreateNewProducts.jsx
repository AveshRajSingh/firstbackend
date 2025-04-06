import React, { useState } from "react";
import axios from "axios";

const CreateProduct = () => {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        countInStock: "",
        imageUrl: "",
        backgroundColor: "",
        foregroundColor: "",
        category: ""
    });
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/products", formData);
            console.log("Product created:", response.data);
            alert("Product successfully created!");
            setFormData({
                name: "",
                price: "",
                description: "",
                countInStock: "",
                imageUrl: "",
                backgroundColor: "",
                foregroundColor: "",
                category: ""
            });
        } catch (error) {
            console.error("Error creating product:", error);
            alert("Failed to create product.");
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-lg border rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Create Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {Object.keys(formData).map((key) => (
                    <div key={key}>
                        <label className="block text-sm font-medium">{key}</label>
                        <input
                            type={key === "price" || key === "countInStock" ? "number" : "text"}
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>
                ))}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                    Create Product
                </button>
            </form>
        </div>
    );
};

export default CreateProduct;

