import { useState, useEffect } from "react";
import axios from "axios";

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
        throw new Error("Failed to fetch products");
      }
      if (response.data && Array.isArray(response.data.data)) {
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
      <div className="text-center p-4">
        <div className="flex justify-center items-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
        <p className="mt-2">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 p-4">
        <p>{error}</p>
        <button
          onClick={fetchProducts}
          className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    );

  if (!products || products.length === 0)
    return <div className="text-center p-4 text-gray-500">No products available.</div>;

  const getPlaceholderImage = (category) => {
    const placeholders = {
      electronics: "https://www.bing.com/images/search?q=bags%20image&FORM=IQFRBA&id=11C7C8FD887FF7EFEDA1C5C094626B6E30124B3A",
      fashion: "https://www.bing.com/images/search?q=bags%20image&FORM=IQFRBA&id=99F7C3FB170C48355C767FB3CB7EBE5FA485250D",
      fine: "https://www.bing.com/images/search?q=bags%20image&FORM=IQFRBA&id=D37545A02BDD9CC0BB5EA9F6ECBC442072107E58",
      default: "https://www.bing.com/images/search?q=bags%20image&FORM=IQFRBA&id=11C7C8FD887FF7EFEDA1B15C0EB2C4DB2D260148"
    };
    return placeholders[category] || placeholders.default;
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="border p-4 rounded-lg shadow-md transform transition-transform duration-200 hover:scale-105"
            style={{ backgroundColor: product.backgroundColor || "#ffffff" }}
          >
            <img
              src={product.imageUrl || getPlaceholderImage(product.category)}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <h3 className="text-lg font-semibold" style={{ color: product.foregroundColor || "#000000" }}>
              {product.name}
            </h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-blue-600 font-bold">${product.price}</p>
            <p
              className={
                product.countInStock < 5
                  ? "text-red-500 font-bold"
                  : "text-gray-500"
              }
            >
              Stock: {product.countInStock}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProduct;

