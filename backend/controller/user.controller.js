import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";





const registerUser = async (req, res) => {
    try {
        const {name , username , email, password, contact, picture} = req.body;
        if(!name && !username && !email && !password) {
            throw new ApiError(400, "Bad Request");
        }
        // check if user already exists
        const user = await User.findOne({email});
        if(user) {
            throw new ApiError(400, "User already exists");
        }


    }catch(error) {
        console.log(error);
        throw new ApiError(500, "Internal Server Error");
    }
}

export { registerUser }