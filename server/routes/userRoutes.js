import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUsersCountPerRole,
  login,
  register,
  updateUser,
} from "../controllers/userController.js";
import { requireRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

//Register
router.post("/register", register);

//Login
router.post("/login", login);

//UPDATE
router.put("update/:id", updateUser);

//DELETE
router.delete("delete/:id", deleteUser);

//GET ALL USERS

router.get("/get", getAllUsers);

router.get("/count", getUsersCountPerRole);

export default router;
