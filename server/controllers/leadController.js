import bcrypt from "bcryptjs";
import Lead from "../models/leadModel.js";
import Industry from "../models/masterModel/industryModel.js";
import Keyword from "../models/masterModel/keyWordModel.js";
import CopyTable from "../models/copyModel.js";
import { sequelize } from "../config/databaseConnection.js";
import axios from 'axios';

 

// export const leadCreate = async (req, res, next) => {
//   try {
//     const { firstname, lastname, email, password,phone, role, job_title, company, country,company_size, industry, keyword } = req.body;

//     const existingLead = await Lead.findOne({ where: { email } });
//     if (existingLead) {
//       return res.status(400).json({ message: 'Lead already exists' });
//     }

//     const maxLeadId = await Lead.max('lead_id');

//     // Check if the table is empty
//     const count = await Lead.count();
//     const lead_id = count > 0 ? maxLeadId + 1 : 1;

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Find or create industry and keyword by name
//     const [industryInstance, keywordInstance] = await Promise.all([
//       Industry.findOrCreate({ where: { name: industry } }),
//       Keyword.findOrCreate({ where: { name: keyword } })
//     ]);
//     // console.log("industryInstance :",industryInstance)
//     // console.log("keywordInstance :",keywordInstance);
//     // Extract IDs from industry and keyword instances
//     const industryName = industryInstance[0].name;
//     const keywordName= keywordInstance[0].name;

//     // Create the lead
//     const newLead = await Lead.create({
//       lead_id,
//       firstname,
//       lastname,
//       email,
//       password: hashedPassword,
//       phone,
//       role: role || 'user', // Default role is 'user' if not specified
//       job_title,
//       company,
//       country,
//       company_size,
//       IndustryName: industryName,
//       KeywordName: keywordName
//     });

//     res.status(201).json({ message: 'Lead created successfully', lead: newLead });
//   } catch (error) {
//     next(error);
//   }
// };

// UPDATE THE LEAD

export const leadCreate = async (req, res, next) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      phone,
      role,
      job_title,
      company,
      country,
      company_size,
      industry,
      keyword,
    } = req.body;

    // Check if any required fields are missing
    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !job_title ||
      !company ||
      !country ||
      !company_size ||
      !industry ||
      !keyword
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const existingLead = await Lead.findOne({ where: { email } });
    if (existingLead) {
      return res.status(400).json({ message: "Lead already exists" });
    }

    const maxLeadId = await Lead.max("lead_id");
    const lead_id = maxLeadId ? maxLeadId + 1 : 1;

    const hashedPassword = await bcrypt.hash(password, 10);

    const [industryInstance, keywordInstance] = await Promise.all([
      Industry.findOrCreate({ where: { name: industry } }),
      Keyword.findOrCreate({ where: { name: keyword } }),
    ]);

    const industryName = industryInstance[0].name;
    console.log("industryName :", industryName);
    const keywordName = keywordInstance[0].name;
    console.log("keywordName :", keywordName);

    const newLead = await Lead.create({
      lead_id,
      firstname,
      lastname,
      email,
      password: hashedPassword,
      phone,
      role: role || "user",
      job_title,
      company,
      country,
      company_size,
      IndustryName: industryName,
      KeywordName: keywordName,
    });

    res
      .status(201)
      .json({ message: "Lead created successfully", lead: newLead });
  } catch (error) {
    next(error);
  }
};

export const updateLead = async (req, res, next) => {
  try {
    const { lead_id } = req.params;
    const {
      firstname,
      lastname,
      email,
      password,
      role,
      job_title,
      company,
      country,
      region,
      company_size,
      industry,
      keyword,
      copyStatus,
    } = req.body;

    const lead = await Lead.findOne({ where: { lead_id } });
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    let industryInstance, keywordInstance;
    if (industry) {
      industryInstance = await Industry.findOne({ where: { name: industry } });
      if (!industryInstance) {
        // Create industry if it doesn't exist
        industryInstance = await Industry.create({ name: industry });
      }
      lead.IndustryName = industryInstance.id;
      lead.industry = industryInstance.name;
    }

    if (keyword) {
      keywordInstance = await Keyword.findOne({ where: { name: keyword } });
      // if (!keywordInstance) {
      //   // Create keyword if it doesn't exist
      //   keywordInstance = await Keyword.create({ name: keyword });
      // }
      lead.KeywordName = keywordInstance.id;
      lead.keyword = keywordInstance.name;
    }

    // Update other lead fields
    if (firstname) {
      lead.firstname = firstname;
    }
    if (lastname) {
      lead.lastname = lastname;
    }
    if (email) {
      lead.email = email;
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      lead.password = hashedPassword;
    }
    if (role) {
      lead.role = role;
    }
    if (job_title) {
      lead.job_title = job_title;
    }
    if (company) {
      lead.company = company;
    }
    if (country) {
      lead.country = country;
    }
    if (region) {
      lead.region = region;
    }
    if (company_size) {
      lead.company_size = company_size;
    }
    if (copyStatus !== undefined) {
      lead.copyStatus = copyStatus;
    }
    // Save the updated lead
    await lead.save();

    res.status(200).json({ message: "Lead updated successfully", lead });
    copyData();
  } catch (err) {
    next(err);
  }
};

// DELETE THE LEAD

export const deleteLead = async (req, res, next) => {
  try {
    const { id } = req.params;

    const lead = await Lead.findByPk(id);
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    // Delete the lead
    await lead.destroy();

    res.status(200).json({ message: "Lead has been deleted." });
  } catch (err) {
    next(err);
  }
};

//GET ALL THE LEAD INFO

export const getAllLeads = async (req, res, next) => {
  try {
    // Fetch all leads
    const leads = await Lead.findAll();

    // If there are no leads, return 404
    if (leads.length === 0) {
      return res.status(404).json({ message: "No leads found" });
    }

    // If leads are found, return them
    res.status(200).json({ leads });
  } catch (err) {
    next(err);
  }
};

//Krishna
export const updateLeadCopyData = async (req, res, next) => {
  try {
    const { lead_id } = req.params;
    const { copyStatus } = req.body;

    const lead = await Lead.findOne({ where: { lead_id } });
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    // Update other lead fields

    if (copyStatus !== undefined) {
      lead.copyStatus = copyStatus;
    }
    // Save the updated lead
    await lead.save();

    res.status(200).json({ message: "Lead updated successfully", lead });
  
  } catch (err) {
    next(err);
  }
};


export const copyData = async (req, res) => {
  try {
    // Find all unique records in Lead table where copyStatus is true
    const leadsToCopy = await Lead.findAll({
      where: {
        copyStatus: true,
      },
    });

    // If there are records to copy
    if (leadsToCopy.length > 0) {
      // Begin a transaction
      const transaction = await sequelize.transaction();

      try {
        // Iterate through the records and copy them to the target table
        for (const lead of leadsToCopy) {
          // Use findOrCreate to ensure uniqueness based on email
          const [copiedLead, created] = await CopyTable.findOrCreate({
            where: { email: lead.email }, // Check if email already exists
            defaults: {
              // Map attributes from Lead to TargetTable
              id: lead.lead_id,
              firstname: lead.firstname,
              lastname: lead.lastname,
              email: lead.email,
              phone: lead.phone,
              password: lead.password,
              job_title: lead.job_title,
              company: lead.company,
              country: lead.country,
              company_size: lead.company_size,
              role: lead.role,
              IndustryName: lead.IndustryName,
              KeywordName: lead.KeywordName,
            },
            transaction,
          });

          // If the lead was not already in the target table, created will be true
          if (!created) {
            // If the lead was already copied, update the existing record in CopyTable
            await CopyTable.update(
              {
                // Update attributes if needed
                firstname: lead.firstname,
                lastname: lead.lastname,
                phone: lead.phone,
                password: lead.password,
                job_title: lead.job_title,
                company: lead.company,
                country: lead.country,
                company_size: lead.company_size,
                role: lead.role,
                IndustryName: lead.IndustryName,
                KeywordName: lead.KeywordName,
              },
              { where: { email: lead.email }, transaction }
            );
          }
        }

        // Commit the transaction if all inserts/updates are successful
        await transaction.commit();
        res.status(200).send({
          message: "Data Copied Successfully",
        });
      } catch (error) {
        // If any error occurs during copying, rollback the transaction
        await transaction.rollback();
        res.status(500).send({
          Error: error,
          message: "Getting Error in Copying Data",
        });
      }
    } else {
      res.status(500).send({
        message: "No Data to Copy",
      });
    }
  } catch (error) {
    res.status(500).send({
      Error: error,
      message: "Error fetching data to copy",
    });
  }
};


//Zerobounce Api functionality For Email Validation

export const checkEmailValidity = async (req, res) => {
  try {
    // Fetch emails from the Lead model
    const emails = await Lead.findAll({
      attributes: ['email'] // Select only the email column
    });

    // Extract email addresses from the result
    const emailAddresses = emails.map(lead => lead.email);

    // Loop through each email address and validate individually
    const responses = [];
    const apiKey = '439bf62abd6e4c3faf335c614d4cc76a'; // Use environment variable for API key
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    for (const email of emailAddresses) {
      try {
        const response = await axios.post('https://api.zerobounce.net/v2/validate', {
          email,
          api_key: apiKey
        }, { headers });

        responses.push(response.data);
      } catch (error) {
        console.error('Error validating email:', error);
        responses.push({ error: 'Error validating email', email: email });
      }
    }

    res.status(200).send(responses); // Send the responses array containing validation results
    console.log("Email addresses validated:", emailAddresses);
  } catch (error) {
    // Handle unexpected errors
    console.error('Error checking email validity:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
};


