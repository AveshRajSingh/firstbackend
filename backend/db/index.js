import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

const connectDb = async() =>{
        try {
           await mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`)
        } catch (error) {
            console.log("error occured during connection",error)
            throw new ApiError(500,"db not connected");
        }
}

export {connectDb}