import { Router } from "express";
import{ createAdmin }from "../controller/admin.controller.js"
import { createProduct } from "../controller/product.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyUser } from "../middleware/veryfyUser.js";


const router = Router();

router.route("/create").post(verifyUser,createAdmin)
router.route("createProduct").post(upload.single("productImage"),createProduct)

export default router;
// Compare this snippet from backend/routes/user.route.js: