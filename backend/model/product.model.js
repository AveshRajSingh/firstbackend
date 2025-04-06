import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    countInStock: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    backgroundColor: {
        type: String,
        required: true,
    },
    foregroundColor: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
},{timestamps:true});


const Product = mongoose.model("Product", productSchema);

export default Product;