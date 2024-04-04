import express from "express";
import {
  deleteRole,
  getAllRoles,
  roleCreate,
} from "../controllers/roleController.js";

const router = express.Router();

//create
router.post("/create", roleCreate);

//DELETE
router.delete("delete/:id", deleteRole);

//GET ALL ROLES

router.get("/get", getAllRoles);

export default router;
