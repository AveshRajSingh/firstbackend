import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const verifyAdmin = (req,res,next) => {
  try {
      const user = req.user;
      if(!user){
          return res.status(400).json(new ApiError(400, "please login first!!"))
      }
      if(!user.isAdmin){
          return res.status(201).josn(new ApiResponse(201, "user is not an admin"))
      }
      req.admin = user.isAdmin;
      next();
      
  } catch (error) {
    console.log("ERR: verify admin",error)
  }
}

export {verifyAdmin}