import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = async (req, res) => {
  try {
    const { name, username, email, password, contact } = req.body;

    // Validate required fields
    if (!name || !username || !email || !password) {
      return res.status(400).json(new ApiResponse(400, "Bad Request"));
    }

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json(new ApiResponse(400, "User already exists"));
    }

    // Create new user
    const createdUser = await User.create({
      name,
      username,
      email,
      password,
      contact: contact ?? "",
      picture: req.file ? req.file.path : null,
    });

    // Send success response
    return res.json(new ApiResponse(200, "User created successfully", createdUser));
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json(new ApiResponse(500, "Internal Server Error"));
  }
};

const loginUser = async (req, res) => {
  // get the details from the request
  // find the user from that details
  // if user exists then check the password
  // if password is correct then generate the token
  // send the token to the user
  // if password is wrong then send the message
  // if user does not exist then send the message
  try {
    const { email, password } = req.body;
    console.log("email : and password", email, password);
    if (!email || !password) {
      throw new ApiError(400, "Bad Request");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(400, "User does not exist");
    }
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      throw new ApiError(400, "Password is incorrect");
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
    res.send(new ApiResponse(200, "Login successful", userTobeSent));
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal Server Error");
  }
};

const changePassword = async (req, res) => {
  const { password, newPassword } = req.body;
  if (!password || !newPassword) {
    throw new ApiError(400, "Bad Request");
  }
  if (password === newPassword) {
    throw new ApiError(400, "New password cannot be same as old password");
  }

  const user = await User.findById(req.user._id);
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Password is incorrect");
  }
  user.password = newPassword;
  await user.save();
  res.send(new ApiResponse(200, "Password changed successfully"));
};

const createAdmin = async (req, res) => {
  const owner = req.user;
  if (owner.isAdmin) {
    throw new ApiError(401, "you are already an owner");
  }
  owner.isAdmin = true;
  await owner.save();
  res.send(new ApiResponse(200, "Owner created successfully"));
};

export { registerUser, loginUser, changePassword, createAdmin };
