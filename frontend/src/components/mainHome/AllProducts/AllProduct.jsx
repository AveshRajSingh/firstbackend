import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../ProductCard.jsx";
import { ToastContainer, toast } from "react-toastify";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/products/getProducts", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status !== 200) {
        toast.error("Failed to fetch products");
        throw new Error("Failed to fetch products");
      }
      if (response.data && Array.isArray(response.data.data)) {
        toast.success("Products fetched successfully");
        setProducts(response.data.data);
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

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center items-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
          <p className="mt-2 text-gray-600">Loading products...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchProducts}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );

  if (!products || products.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p className="text-xl">No products available.</p>
          <p className="text-sm mt-2">Check back later for new products.</p>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">All Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProduct;

