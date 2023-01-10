import { Router } from "express";
import { allowUserToEdit, editUserData, getAllUsers, userVerification } from "../controllers/admin.mjs";
import auth, { isAdmin } from "../middleware/auth.mjs";

const router = Router();

router.use(auth, isAdmin);
router.get("/get-all-users", getAllUsers);
router.post("/user-verification/:id", userVerification);
router.put("/edit-user/:id", editUserData);
router.put("/allow-user-to-edit/:id", allowUserToEdit);

export default router;