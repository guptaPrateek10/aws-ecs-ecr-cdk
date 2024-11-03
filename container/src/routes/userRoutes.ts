import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userControllers";
import { login } from "../controllers/authController";
import { VerifyToken } from "../middleware/authMiddleware";
const router = Router();

router.post("/register", createUser);
router.get("/", VerifyToken, getAllUsers);
router.get("/:id", VerifyToken, getUserById);
router.delete("/:id", VerifyToken, deleteUser);
router.post("/login", login);
router.put("/update", VerifyToken, updateUser);
export default router;
