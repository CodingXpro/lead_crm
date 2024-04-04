import { sequelize } from "../config/databaseConnection.js";
import Campaign from "../models/compaignModel.js";
import CopyTable from "../models/copyModel.js";

export const campaignCreate = async (req, res) => {
  const {
    industry_name,
    keyword_name,
    campaign_name,
    followup1,
    followup2,
    followup3,
    followup4,
  } = req.body;

  try {
    // Check if the campaign already exists
    let existingCampaign = await Campaign.findOne({ where: { campaign_name } });
    if (existingCampaign) {
      return res.status(400).json({ message: "Campaign already exists" });
    }
    const maxCampId = await Campaign.max("id");

    // Check if the table is empty
    const count = await Campaign.count();
    const id = count > 0 ? maxCampId + 1 : 1;

    const newCampaign = await Campaign.create({
      id,
      campaign_name,
      industry_name,
      keyword_name,
    });
    return res.status(201).json({
      message: "Campaign created successfully",
      campaign: newCampaign,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// UPDATE THE CAMPAIGN

export const updateCampaign = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      industry_name,
      keyword_name,
      campaign_name,
      followup1,
      followup2,
      followup3,
      followup4,
    } = req.body;

    const campaign = await Campaign.findOne({ where: { id } });
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    // Update other campaign fields
    if (industry_name) {
      campaign.industry_name = industry_name;
    }
    if (keyword_name) {
      campaign.keyword_name = keyword_name;
    }
    if (campaign_name) {
      campaign.campaign_name = campaign_name;
    }

    // Update follow-ups and their corresponding times
    if (followup1 !== undefined) {
      campaign.followup1 = followup1;
      campaign.followup1_time = followup1 ? new Date() : null; // Set current time if followup1 is true
    }
    if (followup2 !== undefined) {
      campaign.followup2 = followup2;
      campaign.followup2_time = followup2 ? new Date() : null; // Set current time if followup2 is true
    }
    if (followup3 !== undefined) {
      campaign.followup3 = followup3;
      campaign.followup3_time = followup3 ? new Date() : null; // Set current time if followup3 is true
    }
    if (followup4 !== undefined) {
      campaign.followup4 = followup4;
      campaign.followup4_time = followup4 ? new Date() : null; // Set current time if followup4 is true
    }

    // Save the updated campaign
    await campaign.save();

    res
      .status(200)
      .json({ message: "Campaign updated successfully", campaign });
  } catch (err) {
    next(err);
  }
};

// DELETE THE LEAD

export const deleteCampaign = async (req, res, next) => {
  try {
    const { id } = req.params;

    const campaign = await Campaign.findByPk(id);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    // Delete the lead
    await campaign.destroy();

    res.status(200).json({ message: "Campaign has been deleted." });
  } catch (err) {
    next(err);
  }
};

export const getAllCampaigns = async (req, res, next) => {
  try {
    // Fetch all campaigns
    const campaigns = await Campaign.findAll();

    // If there are no campaigns, return 404
    if (campaigns.length === 0) {
      return res.status(404).json({ message: "No campaigns found" });
    }

    // Exclude follow-up times from each campaign
    const modifiedCampaigns = campaigns.map((campaign) => {
      const {
        followup1_time,
        followup2_time,
        followup3_time,
        followup4_time,
        updatedAt,
        createdAt,
        ...rest
      } = campaign.toJSON();
      return rest;
    });

    // Return modified campaigns
    res.status(200).json({ campaigns: modifiedCampaigns });
  } catch (err) {
    next(err);
  }
};

//get the email count as company wise

export const countEmailsPerCompany = async (req, res) => {
  try {
    const emailCounts = await CopyTable.findAll({
      attributes: [
        "company",
        [sequelize.fn("COUNT", sequelize.col("email")), "emailCount"],
      ],
      group: ["company"],
    });

    // Logging the results
    // emailCounts.forEach((result) => {
    //   console.log(
    //     `Company: ${result.company}, Email Count: ${result.dataValues.emailCount}`
    //   );
    // });

    res.status(200).json(emailCounts);
  } catch (error) {
    console.error("Error counting emails per company:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//get the all data which present in the database

export const getCopyTableData = async (req, res) => {
  try {
    const copyTableData = await CopyTable.findAll({
      attributes: [
        "company",
        "id",
        "email",
        // [sequelize.fn("COUNT", sequelize.col("email")), "emailCount"],
      ],
      group: ["company", "id", "email"],
      order: [
        // [sequelize.literal("emailCount"), "ASC"], // Order by email count DESC
        ["company", "ASC"], // Then order by company name DESC
      ],
    });

    res.status(200).json(copyTableData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};