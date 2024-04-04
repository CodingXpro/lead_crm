import express from "express";
// import { requireRole } from "../middleware/roleMiddleware.js";
import { deleteIndustry, getallIndustry, industryCreate, updateIndustry } from "../../controllers/master/industryController.js";

const router = express.Router();

//CREATE THE LEAD
router.post("/create", industryCreate)

//UPDATE THE LEAD
router.put("/:id", updateIndustry);

//DELETE THE LEAD
router.delete("/:id", deleteIndustry);

router.get('/get',getallIndustry);


export default router