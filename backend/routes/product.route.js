import { Router } from "express";

const router = Router();
import {
  createProduct,
  getProducts,
  getProductByOwner,
} from "../controller/product.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyUser } from "../middleware/veryfyUser.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

router
  .route("/createProduct")
  .post(verifyUser, verifyAdmin, upload.single("imageUrl"), createProduct);
router.route("/getProducts").get(getProducts);
router
  .route("/productByOwner/:owner")
  .get(verifyUser, verifyAdmin, getProductByOwner);

export default router;
