import { Router } from "express";
import { login, register, verifyUser } from "../controllers/auth.mjs";
import auth from "../middleware/auth.mjs";
import {
	validateEmail,
	validatePassword,
	validatePhone,
} from "../middleware/validate.mjs";

const router = Router();

router.post(
	"/register",
	validateEmail,
	validatePhone,
	validatePassword,
	register
);
router.post("/login", validateEmail, validatePassword, login);
router.get("/", auth, verifyUser);

export default router;
