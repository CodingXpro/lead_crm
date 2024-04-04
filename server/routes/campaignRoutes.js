import express from "express";
import {
  campaignCreate,
  countEmailsPerCompany,
  deleteCampaign,
  getAllCampaigns,
  getCopyTableData,
  updateCampaign,
} from "../controllers/campaignController.js";

const router = express.Router();

//CREATE THE LEAD
router.post("/create", campaignCreate);
router.put("/update/:id", updateCampaign);
router.delete("/delete/:id", deleteCampaign);
router.post("/upload", updateCampaign);
router.get("/get", getAllCampaigns);
router.get("/company/get", countEmailsPerCompany);
router.get("/data/copytable/get", getCopyTableData);

export default router;
