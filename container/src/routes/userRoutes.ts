import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
} from "../controllers/userControllers";

const router = Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);

export default router;
