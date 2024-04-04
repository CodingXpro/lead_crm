// Import necessary modules
import fs from "fs";
import Lead from "../models/leadModel.js"; // Import the Lead model
import Mailjet from "node-mailjet";

// Set up Mailjet
const mailjet = new Mailjet({
  apiKey: "931351f79f4dd56a06f7a520bc9a216e",
  apiSecret: "26691ef9475b0cb4f4467add483b9ca6",
});

// Read the HTML template file
const htmlTemplate = fs.readFileSync("./emailTemplate.html", "utf8");

// Define a function to send emails to multiple recipients
export const sendBulkEmails = async () => {
  try {
    // Fetch all distinct email addresses from the Lead table
    const leadEmails = await Lead.findAll({
      attributes: ["email"],
      raw: true,
      group: ["email"],
    });

    // Extract email addresses from the query results
    const uniqueEmails = leadEmails.map((lead) => lead.email);

    // Construct an array of requests to be sent in parallel
    const requests = uniqueEmails.map((email) => {
      return mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
          {
            From: {
              Email: "talk@kingsresearch.com",
              Name: "Sender",
            },
            To: [
              {
                Email: email,
                Name: "Recipient",
              },
            ],
            Subject: "Test Email",
            TextPart:
              "Hi I am Sakshi from xdbs. I am sending this mail for testing purposes.",
            HTMLPart: htmlTemplate, // Pass the HTML content here
          },
        ],
      });
    });

    // Execute all requests in parallel
    const results = await Promise.all(requests);
    results.forEach((result) => {
      res.status(200).send({
        message: "Email Send Successfully !!",
      });
      //   console.log(result.body);
    });
  } catch (error) {
    throw error;
  }
};
