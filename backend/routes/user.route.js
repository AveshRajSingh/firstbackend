import { Router } from "express";
import { loginUser, registerUser, changePassword } from "../controller/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyUser } from "../middleware/veryfyUser.js";

// upload.single("picture"),

const router = Router();


router.route("/register").post(upload.single("picture"), registerUser);
router.route("/login").post(loginUser)

// protected route

router.route("/changePassword").post(verifyUser, changePassword)

export default router;
