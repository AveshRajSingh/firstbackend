import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";

const verifyAdmin = (req,res,next) => {
  try {
      const user = req.user;
      if(!user){
          return res.status(400).json(new ApiError(400, "please login first!!"))
      }
      if(user.isAdmin){
          return res.status(200).josn(new ApiResponse(200, "user is an admin"))
      }
  } catch (error) {
    console.log("ERR: verify admin",error)
  }
}

export {verifyAdmin}