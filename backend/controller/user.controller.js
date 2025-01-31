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

export { registerUser }