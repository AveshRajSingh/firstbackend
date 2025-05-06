import {  useContext } from "react";
import ProductCard from "../ProductCard.jsx";
import { ProductContext } from "../../../context/ProductContext.jsx";

const AllProduct = () => {
  const { products, loading, error, fetchProducts } =
    useContext(ProductContext);

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
