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
      console.log("Inside the try block of verifyUser middleware");
      const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decodedToken.id).select("-password -refreshToken");

      if (!user) {
        throw new ApiError(404, "User not found");
      }

      req.user = user;
      console.log("req.user", req.user);
      return next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        // Access token is expired, try refreshing it
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

          // Generate new access token
          const newAccessToken = jwt.sign(
            { id: user.id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
          );

          // Set new access token in cookies
          res.cookie("token", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
          });

          req.user = user;
          return next();
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          res.clearCookie("token");
          res.clearCookie("refreshToken");
          return next(new ApiError(401, "Invalid or expired refresh token"));
        }
      } else {
        console.error("Error verifying token:", error);
        return next(new ApiError(401, "Invalid or expired token"));
      }
    }
  } catch (error) {
    console.error("Error verifying user:", error);
    return next(new ApiError(error.statusCode || 500, error.message || "Internal Server Error"));
  }
};
export { verifyUser };