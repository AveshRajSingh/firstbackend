import Product from "../model/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createProduct = async (req, res) => {
  try {
    console.log("user is ->",req.user);
    const {
      name,
      price,
      description,
      countInStock,
      backgroundColor,
      foregroundColor, // Corrected typo
      category,
    } = req.body;
     
    if (
      !name ||
      !price ||
      !description ||
      !countInStock ||
      !backgroundColor ||
      !foregroundColor ||
      !category
    ) {
      return res.status(400).json(new ApiError(400, "All fields are required"));
    }
    console.log(name, price, description, countInStock, backgroundColor, foregroundColor, category);
    
    if (req.file && !req.file.originalname) {
      return res.status(400).json(new ApiError(400, "Invalid file"));
    }
   console.log("before the try")
    try {
        console.log("till here")
      const createdProduct = await Product.create({
        owner: req.user._id,
        name,
        price,
        description,
        countInStock,
        imageUrl: req.file ? req.file.path : null,
        backgroundColor,
        foregroundColor : req.body.foregroundColor,
        category,
      });

      console.log("here is the created product", createdProduct);
      return res.json(new ApiResponse(201, "Product created successfully", createdProduct));
    } catch (error) {
      console.error("Error creating product", error);
      return res.status(500).json(new ApiError(500, "Error creating product"));
    }
  } catch (error) {
    console.error("Error in createProduct", error);
    return res.status(500).json(new ApiError(500, "Internal server error"));
  }
};


const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.json(new ApiResponse(200, "Products fetched successfully", products));
  } catch (error) {
    console.error("Error in getProducts", error);
    return res.status(500).json(new ApiError(500, "Internal server error"));
  }
};

export { createProduct, getProducts };
