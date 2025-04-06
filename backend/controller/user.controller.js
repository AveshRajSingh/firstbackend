import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import emailValidator from "email-validator";
import { validateEmail } from "../utils/validateEmail.js";

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
  //  const emailValidation = await validateEmail(email);
  //  if(emailValidation.status === "invalid"){
  //   return res.status(400).json(new ApiError(400, "email does not exist"));
  //  }
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


export { registerUser, loginUser, changePassword};
