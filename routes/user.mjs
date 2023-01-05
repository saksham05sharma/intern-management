import { Router } from "express";
import { editUserData } from "../controllers/user.mjs";

const router = Router();

router.patch("/:id", editUserData);

export default router;