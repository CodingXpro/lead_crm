import User from "../models/userModel.js";
import Lead from "../models/leadModel.js";
import Keyword from "../models/masterModel/keyWordModel.js";
import Industry from "../models/masterModel/industryModel.js";
import Campaign from "../models/compaignModel.js";
import Role from "../models/userRole.js";
import CopyTable from "../models/copyModel.js";

export const createTables = async () => {
  //for USERMODEL
  try {
    // Synchronize all defined models to the database
    await User.sync({ force: true }); // This will drop the table if it already exists and then create a new one
    console.log("User Tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};
export const createTablesForLead = async () => {
  //for LEADMODEL
  try {
    // Synchronize all defined models to the database
    await Lead.sync({ force: true });
    console.log("Lead Tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};

export const createTablesForIndustry = async () => {
  //for INDUSTRY
  try {
    await Industry.sync({ force: true });
    console.log("Industry Tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};

export const createTablesForKeyword = async () => {
  //for KEYWORDS
  try {
    // Synchronize all defined models to the database
    await Keyword.sync({ force: true });
    console.log("Keyword Tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};

export const createTablesForBulkLead = async () => {
  //for BULK LEAD UPLOAD
  try {
    // Synchronize all defined models to the database
    await bulkLead.sync({ force: true });
    console.log("bulkLead Tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};

export const createTablesForCompaign = async () => {
  //for Compaign MOdule
  try {
    // Synchronize all defined models to the database
    await Campaign.sync({ force: true });
    console.log("Campaign Tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};

export const createTablesForRole = async () => {
  //for USERMODEL
  try {
    // Synchronize all defined models to the database
    await Role.sync({ force: true }); // This will drop the table if it already exists and then create a new one
    console.log("Role Tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};
export const createTablesForCampaign = async () => {
  //for USERMODEL
  try {
    // Synchronize all defined models to the database
    await Campaign.sync({ force: true }); // This will drop the table if it already exists and then create a new one
    console.log("Role Tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};

export const createTablesForCopyData = async () => {
  //for CopyModel
  try {
    // Synchronize all defined models to the database
    await CopyTable.sync({ force: true }); // This will drop the table if it already exists and then create a new one
    console.log("Copydata Tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};
