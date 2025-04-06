import { Router } from "express";
import{ createAdmin }from "../controller/admin.controller.js"
import { verifyUser } from "../middleware/veryfyUser.js";


const router = Router();

router.route("/create").post(verifyUser,createAdmin)


export default router;
// Compare this snippet from backend/routes/user.route.js: