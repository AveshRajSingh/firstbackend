import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:3000/api/v1/products/getProducts", {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.status !== 200) {
                toast.error("Failed to fetch products");
                throw new Error("Failed to fetch products")
            }
            if (response.data && Array.isArray(response.data.data)) {
                toast.success("Products fetched successfully");
                setProducts(response.data.data);
                console.log(products);
            } else {
                throw new Error("Unexpected response format");
            }
        } catch (error) {
            setError(
                error.response?.data?.message ||
                error.message ||
                "Failed to fetch products. Please try again later."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ products, loading, error,setLoading, setError, setProducts, fetchProducts }}>
            {children}
        </ProductContext.Provider>
    );
};

export { ProductContext, ProductProvider };