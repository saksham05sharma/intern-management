import { Router } from "express";
import { editUserData } from "../controllers/user.mjs";
import auth, { isVerified } from "../middleware/auth.mjs";

const router = Router();

router.use(auth, isVerified);
router.put("/edit/:id", editUserData);

export default router;