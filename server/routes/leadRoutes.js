import express from "express";
import {
  deleteLead,
  updateLead,
  leadCreate,
  getAllLeads,
  copyData,
  updateLeadCopyData,
 
  checkEmailValidity,
} from "../controllers/leadController.js";
import { handleCSVUpload } from "../middleware/multer.js";
import multer from "multer";
// import { requireRole } from "../middleware/roleMiddleware.js";

import { fileUpload1 } from "../service/fileUploadService.js";
import { sendBulkEmails } from "../service/bulkMailService.js";

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../assets/uploadedfile"); // Specify the destination folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Keep the original filename
  },
});
const upload = multer({ storage: storage });

const router = express.Router();

//CREATE THE LEAD
router.post("/create", leadCreate);

//GET ALL LEAD
router.get("/get", getAllLeads);

//UPDATE THE LEAD
router.put("/update/:lead_id", updateLead);

//DELETE THE LEAD
router.delete("/delete/:id", deleteLead);
router.post("/upload", fileUpload1);

router.post("/email", sendBulkEmails);

//for selected checkbox
router.put("/copy-data/:lead_id", updateLeadCopyData);

router.post("/selected-data", copyData);

router.post("/validate", checkEmailValidity);

export default router;
