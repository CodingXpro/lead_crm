import express from "express";
// import { requireRole } from "../middleware/roleMiddleware.js";
// import { deleteIndustry, industryCreate, updateIndustry } from "../../controllers/master/industryController.js";
import { deleteKeyword, getallKeyword, keywordCreate, updateKeyword } from "../../controllers/master/keywordController.js";

const router = express.Router();

//CREATE THE LEAD
router.post("/create", keywordCreate)

//UPDATE THE LEAD
router.put("/:id", updateKeyword);

//DELETE THE LEAD
router.delete("/:id", deleteKeyword);
router.get('/get',getallKeyword);



export default router