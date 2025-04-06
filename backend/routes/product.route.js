import { Router } from "express";

const router = Router();
import { createProduct , getProducts } from "../controller/product.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyUser } from "../middleware/veryfyUser.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

router.route("/createProduct").post(verifyUser, upload.single("imageUrl"),createProduct)
router.route("/getProducts").get(getProducts)



export default router;