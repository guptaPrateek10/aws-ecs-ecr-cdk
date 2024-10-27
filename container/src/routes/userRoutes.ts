import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
} from "../controllers/userControllers";
import { login } from "../controllers/authController";
const router = Router();

router.post("/register", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
router.post("/login", login);
export default router;
