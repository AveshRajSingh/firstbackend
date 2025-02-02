import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

const verifyUser = async (req, res, next) => {
    try {
      const token = req.cookies?.token;
      if (!token) {
        throw new ApiError(401, "Please provide the token");
      }
  
      try {
        const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken.id).select("-password -refreshToken");
  
        if (!user) {
          throw new ApiError(404, "User not found");
        }
  
        req.user = user;
        next();
      } catch (error) {
        if (error.name === "TokenExpiredError") {
          // Try to refresh the token using the refreshToken
          const refreshToken = req.cookies?.refreshToken;
          if (!refreshToken) {
            throw new ApiError(401, "Please provide the refresh token");
          }
  
          try {
            const decodedRefreshToken = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const user = await User.findById(decodedRefreshToken.id).select("-password -refreshToken");
  
            if (!user) {
              throw new ApiError(404, "User not found");
            }
  
            const newAccessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
              expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
            });
  
            req.cookies.token = newAccessToken;
            req.user = user;
            next();
          } catch (error) {
            console.error("Error refreshing token:", error);
            throw new ApiError(401, "Invalid or expired refresh token");
          }
        } else {
          console.error("Error verifying token:", error);
          throw new ApiError(401, "Invalid or expired token");
        }
      }
    } catch (error) {
      console.error("Error verifying user:", error);
      next(new ApiError(408, "Something went wrong while verifying user"));
    }
  };

export { verifyUser };