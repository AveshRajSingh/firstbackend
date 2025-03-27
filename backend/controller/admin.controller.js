import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../model/user.model.js";

const createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userEmail = req.user.email;
    if (!email || !password) {
      return res
        .status(400)
        .json(new ApiResponse(400, "Email and password are required"));
    }
   
    if (userEmail !== email) {
      return res
        .status(400)
        .json(new ApiResponse(400, "email is not the same as the logged in user"));
    }

    let user = await User.findOne({ email });
    if(!user.isPasswordCorrect(password, user.password)){
      return res.status(401).json(new ApiResponse(401, "Invalid password"));
    }
    if (!user) {
      return res.status(404).json(new ApiResponse(404, `User with email ${email} not found`));
    }


    if (user.isAdmin) {
      return res
        .status(400)
        .json(new ApiResponse(400, "User is already an admin"));
    }

    user.isAdmin = true;
    await user.save();
    return res
      .status(200)
      .json(new ApiResponse(200, "Admin created successfully"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiResponse(500, "Internal Server Error"));
  }
};

export { createAdmin };