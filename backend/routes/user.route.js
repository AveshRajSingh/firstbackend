import { Router } from "express";
import { loginUser, registerUser } from "../controller/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyUser } from "../middleware/veryfyUser.js";

// upload.single("picture"),

const router = Router();


router.route("/register").post(upload.single("picture"), registerUser);
router.route("/login").post(loginUser)

router.get("/some",verifyUser,(req,res)=>{console.log("userVeryfied")})

export default router;
