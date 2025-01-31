import { Router } from "express";
import { loginUser, registerUser } from "../controller/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
// upload.single("picture"),

const router = Router();


router.route("/register").post(upload.single("picture"), registerUser);
router.route("/login").post(loginUser)


export default router;
