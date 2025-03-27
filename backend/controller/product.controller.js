import Product from "../model/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      countInStock,
      imageUrl,
      backgroundColor,
      foregraundColor,
      category,
    } = req.body;
    if (
      !name ||
      !price ||
      !description ||
      !countInStock ||
      !imageUrl ||
      !backgroundColor ||
      !foregraundColor ||
      !category
    ) {
      return res.status(400).json(new ApiError(400, "All fields are required"));
    }

   const createdProduct = await Product.create({
      name,
      price,
      description,
      countInStock,
      imageUrl,
      backgroundColor,
      foregraundColor,
      category,
    });
    return res.json(new ApiResponse(201, "Product created successfully", createdProduct));
  } catch (error) {
    console.log("Error in createProduct", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export { createProduct };
