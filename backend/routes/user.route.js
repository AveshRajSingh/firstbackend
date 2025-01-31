import { Router } from "express";
import { registerUser } from "../controller/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
// upload.single("picture"),

const router = Router();


router.route("/register").post(upload.single("picture"), registerUser);


export default router;
