import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the directory to store CSV files
const uploadDir = path.join(__dirname, "../assets/uploadedfile");

export const handleCSVUpload = async (req, res, next) => {
  try {
    let fileData = "";

    // Listening for incoming data
    await new Promise((resolve, reject) => {
      req.on("data", (chunk) => {
        fileData += chunk;
      });
      req.on("end", resolve);
      req.on("error", reject);
    });

    // Extract file name from headers or form field
    const fileName = req.headers["file-name"] || "uploaded.csv";
    const currentDate = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format
    const fileNameWithDate = `${currentDate}_${fileName}`;
    const filePath = path.join(uploadDir, fileNameWithDate);

    // Write file data to disk
    await fs.promises.writeFile(filePath, fileData);

    //   console.log('File saved:', fileNameWithDate);
    res.setHeader("Content-Type", "text/csv"); // Setting Content-Type header
    res.send("File uploaded successfully.");

    // Call next() to proceed to the next middleware
    next();
  } catch (err) {
    console.error("Error saving file:", err);
    res.status(500).send("Error saving file.");
  }
};
