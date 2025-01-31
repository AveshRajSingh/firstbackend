import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";




const registerUser = async (req, res) => {
    try {
        console.log("inside the registerUser")
        const {name , username , email, password, contact} = req.body;
        if(!name || !username || !email || !password) {
            throw new ApiError(400, "Bad Request");
        }
        // check if user already exists
        const user = await User.findOne({email});
        if(user) {
            throw new ApiError(400, "User already exists");
        }
      
      const createdUser = await User.create({
        name,
        username,
        email,
        password,
        contact: contact ?? "",
        picture: req.file ? req.file.path : null
      })
      res.send(new ApiResponse(200,"user created successfully",createdUser))
    }catch(error) {
        console.log(error);
        throw new ApiError(500, "Internal Server Error");
    }
}

const loginUser = async (req, res) => {
    // get the details from the request
    // find the user from that details 
    // if user exists then check the password
    // if password is correct then generate the token
    // send the token to the user
    // if password is wrong then send the message
    // if user does not exist then send the message
    try {
        const {email,password} = req.body;
        console.log("email : and password",email,password)  
        if(!email || !password) {
            throw new ApiError(400, "Bad Request");
        }
        const user = await User.findOne({email});
        if(!user) {
            throw new ApiError(400, "User does not exist");
        }
        console.log("user is ",user)
        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if(!isPasswordCorrect) {
            throw new ApiError(400, "Password is incorrect");
        }
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save();
        res.cookie("accessToken", accessToken, {httpOnly: true, secure: true, sameSite: "none"});
        res.cookie("refreshToken", refreshToken, {httpOnly: true, secure: true, sameSite: "none"});
        const userTobeSent = await User.findById(user._id).select("-password");
        res.send(new ApiResponse(200,"Login successful",userTobeSent));
    }catch(error) {
        console.log(error);
        throw new ApiError(500, "Internal Server Error");
    }
}

export { registerUser, loginUser }