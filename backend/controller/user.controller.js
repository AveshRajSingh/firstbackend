import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import emailValidator from "email-validator";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

const registerUser = async (req, res) => {
  try {
    const { name, username, email, password, contact } = req.body;
    // Validate required fields
    if (!name || !username || !email || !password) {
      return res.status(400).json(new ApiResponse(400, "Bad Request"));
    }

    // Validate if email format is correct
    if (!emailValidator.validate(email)) {
      return res.status(400).json(new ApiError(400, "Invalid email format"));
    }
    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json(new ApiResponse(400, "User already exists"));
    }
    if (req.file && !req.file.originalname) {
      return res.status(400).json(new ApiResponse(400, "Invalid file"));
    }
    let imageUrl = null;
    if (req.file) {
      imageUrl = await uploadOnCloudinary(req.file.path);
      if (!imageUrl) {
        return res
          .status(500)
          .json(new ApiResponse(500, "Error uploading image"));
      }
    }

    // Create new user
    const createdUser = await User.create({
      name,
      username,
      email,
      password,
      contact: contact ?? "",
      picture: imageUrl?.secure_url || null, // Use the secure URL for HTTPS
    });

    // Send success response
    return res.json(
      new ApiResponse(200, "User created successfully", createdUser)
    );
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json(new ApiResponse(500, "Internal Server Error"));
  }
};

const loginUser = async (req, res) => {
  // get the details from the request body
  // find the user from that details
  // if user exists then check the password
  // if password is correct then generate the token
  // send the token to the user
  // if password is wrong then send the message
  // if user does not exist then send the message
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiError(400, "Bad Request");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json(new ApiError(400, "User does not exist")); // new ApiError(400, "User does not exist");
    }
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json(new ApiResponse(400, "Password is incorrect")); // new ApiError(400, "Password is incorrect");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save();
    const userTobeSent = await User.findById(user._id).select("-password");

    res.cookie("token", accessToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.status(200).json(new ApiResponse(200, "Login successful", userTobeSent));

  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiResponse(500, "Internal Server Error")); // new ApiError(500, "Internal Server Error");
  }
};

const getCurrentUser = async (req, res) => {
  try {
    console.log("rotue hit")
    res
      .status(200)
      .json(new ApiResponse(200, "User fetched successfully", req.user));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiError(500, "Err while fetching user")); // new ApiError(500, "Internal Server Error");
  }
};

const changePassword = async (req, res) => {
  const { password, newPassword } = req.body;
  if (!password || !newPassword) {
    return res.status(400).json(new ApiError(400, "Bad Request")); // new ApiError(400, "Bad Request");
  }
  if (password === newPassword) {
    return res
      .status(400)
      .json(new ApiError(400, "New password cannot be same as old password"));
  }

  const user = await User.findById(req.user._id);
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    return res.status(400).json(new ApiError(400, "Password is incorrect"));
  }
  user.password = newPassword;
  await user.save();
  res.send(new ApiResponse(200, "Password changed successfully"));
};

const logoutUser = async (req, res) => {
  console.log("logout route hit");
  try {
    res.clearCookie("token", { sameSite: "none", secure: true });
    res.clearCookie("refreshToken", { sameSite: "none", secure: true });
    const user = await User.findById(req.user._id);
    user.refreshToken = null;
    await user.save();
    res.status(200).json(new ApiResponse(200, "Logout successful"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiError(500, "Internal Server Error")); // new ApiError(500, "Internal Server Error");
  }
};

export { registerUser, loginUser, changePassword, getCurrentUser,logoutUser };
