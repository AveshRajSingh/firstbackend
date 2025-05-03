import { Router } from "express";
import { loginUser, registerUser, changePassword , getCurrentUser,logoutUser} from "../controller/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyUser } from "../middleware/veryfyUser.js";
import { createAdmin } from "../controller/admin.controller.js";


// upload.single("picture"),

const router = Router();


router.route("/register").post(upload.single("picture"), registerUser);
router.route("/login").post(loginUser)

// protected route

router.route("/logout").get(verifyUser,logoutUser)
router.route("/changePassword").post(verifyUser, changePassword)
router.route("/createOwner").post(verifyUser, createAdmin)
router.route("/currentUser").get(verifyUser, getCurrentUser)

export default router;
