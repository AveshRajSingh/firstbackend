import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        // console.log(token)
        if (!token) {
            throw new ApiError(401, "Please provide the token");
        }

        try {
            const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            console.log("Decoded token",decodedToken)
            const user = await User.findById(decodedToken.id).select("-password -refreshToken");

            if (!user) {
                throw new ApiError(404, "User not found");
            }

            req.user = user;
            next();
        } catch (error) {
            console.error("Error verifying token:", error);
            throw new ApiError(401, "Invalid or expired token");
        }
    } catch (error) {
        console.error("Error verifying user:", error);
        next(new ApiError(408, "Something went wrong while verifying user"));
    }
};

export { verifyUser };