import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/databaseConnection.js";
import userRoutes from "./routes/userRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";
import industryRoutes from "./routes/masterRoutes/industryRoutes.js";
import keywordRoutes from "./routes/masterRoutes/keywordRoutes.js";
import campaignRoutes from "./routes/campaignRoutes.js";
import fileUpload from "express-fileupload";
import path, { dirname } from "path";
import {
  createTables,
  createTablesForBulkLead,
  createTablesForCompaign,
  createTablesForCopyData,
  createTablesForIndustry,
  createTablesForKeyword,
  createTablesForLead,
  createTablesForRole,
} from "./DataTable/modelTable.js";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import { sendBulkEmails } from "./service/bulkMailService.js";
import roleRoutes from "./routes/roleRoutes.js";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(cors());
app.use(express.static(path.join(__dirname, "assets/uploadedfile")));
const port = process.env.port || 5000;

/*
//FOR DATABASE MODEL TABLES 

createTablesForIndustry(); //Table for Industry MASTER MODEL
createTablesForKeyword(); //TABLE FOR KEYWORD MASTER MODEL
createTablesForRole(); //Table for RoleModel
createTables(); //Table for UserModel
createTablesForCompaign(); // Table for Compaign
createTablesForLead(); //Table for LeadModel
createTablesForCopyData(); //Table for CopyLead Data
*/

app.use("/auth", userRoutes); //for USER MODEL
app.use("/lead", leadRoutes); //for LEAD MODEL
app.use("/industry", industryRoutes); // for INDUSTRY MODEL
app.use("/keyword", keywordRoutes); // for KEYWORD MODEL
app.use("/user", userRoutes); //for User Model
app.use("/role", roleRoutes); //for Role Model
app.use("/campaign", campaignRoutes);

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}🐱‍🚀🐱‍🚀🐱‍🚀`);
});
