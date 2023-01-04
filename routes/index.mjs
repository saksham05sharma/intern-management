import { Router } from "express";
import { index } from "../controllers/index.mjs";

const router = Router();

router.get("/", index);

export default router;
