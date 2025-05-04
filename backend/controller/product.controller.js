import Product from "../model/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import cloudinary from "cloudinary";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

const createProduct = async (req, res) => {
  try {
    if(!req.admin){
      return res.status(401).json(new ApiError(401, "Unauthorized"));
    }
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
    
    if (req.file && !req.file.originalname) {
      return res.status(400).json(new ApiError(400, "Invalid file"));
    }
    // Upload image to Cloudinary if a file is provided
    console.log("req.file->",req.file)
    let imageUrl = null;
    if (req.file) {
      try {
        const result = await uploadOnCloudinary(req.file.path);
        imageUrl = result.secure_url; // Use the secure URL for HTTPS
        console.log(imageUrl)
      }
      catch (error) {
        console.error("Error uploading to Cloudinary", error);
        return res.status(500).json(new ApiError(500, "Error uploading image"));
      }
    }

    try {
      const createdProduct = await Product.create({
        owner: req.user._id,
        name,
        price,
        description,
        countInStock,
        imageUrl:imageUrl,
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

const getProductByOwner = async (req, res) => {
  const { owner } = req.params;
  console.log("owner from backend", owner);
  console.log("route hit getProductByOwner")
  if (!owner) {
    return res.status(400).json(new ApiError(400, "Owner ID is required"));
  }

  try {
    const products = await Product.find({ owner });

    return res
      .status(200)
      .json(new ApiResponse(200, "Products fetched successfully", products));
  } catch (error) {
    console.error("Error in getProductByOwner", error);
    return res.status(500).json(new ApiError(500, "Internal server error"));
  }
};

export { createProduct, getProducts, getProductByOwner };
