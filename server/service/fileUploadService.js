import Industry from "../models/masterModel/industryModel.js";
import Keyword from "../models/masterModel/keywordModel.js";
import Lead from "../models/leadModel.js";

import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const convert = async function (csvFile, destinationFolder, fileName) {
  const convert = (from, to) => (str) => Buffer.from(str, from).toString(to);
  const hexToUtf8 = convert("hex", "utf8");
  let csvData = hexToUtf8(csvFile.data).split("\r\n");
  let csvRows = [];
  csvData.forEach((data) => {
    csvRows.push(data.split(","));
  });
  let data = [];
  for (let i = 1; i < csvRows.length - 1; ++i) {
    let dict = {};
    for (let j = 0; j < csvRows[i].length; ++j) {
      dict[csvRows[0][j]] = csvRows[i][j];
    }
    const [industryInstance, keywordInstance] = await Promise.all([
      Industry.findOrCreate({ where: { name: dict.industry } }),
      Keyword.findOrCreate({ where: { name: dict.keyword } }),
    ]);
    // console.log("industryInstance :" ,industryInstance, "keywordInstance :",keywordInstance)
    const industryId = industryInstance[0].id;
    const keywordId = keywordInstance[0].id;
    // console.log("Keyword :",keywordId)
    dict.IndustryId = industryId;
    dict.KeywordId = keywordId;
    // console.log("dic :", dict)
    data.push(dict);
  }

  // Convert data to CSV format
  let csvContent = "";
  data.forEach((row) => {
    csvContent += Object.values(row).join(",") + "\r\n";
  });

  destinationFolder = path.join(__dirname, "../assets/uploadedfile");
  fileName = "sample.csv";
  const currentDate = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format
  const fileNameWithDate = `${currentDate}_${fileName}`;
  // Write CSV to file
  const filePath = `${destinationFolder}/${fileNameWithDate}`;
  fs.writeFile(filePath, csvContent, (err) => {
    if (err) {
      console.error("Error writing CSV file:", err);
    } else {
      console.log("CSV file saved successfully:", filePath);
    }
  });

  return data;
};

//   export const fileUpload1 = async (req, res,next) => {

//     try {
//       // console.log(req.file)
//         if (!req.files || !req.files.file) {
//             return res.json('File not found'); // Return to exit function after sending response

//         } else if (req.files.file.mimetype === 'text/csv') {
//             let csvFile = req.files.file;
//             let data = await convert(csvFile);
//             try {

//                 const books = await Lead.bulkCreate(data);
//                 next();
//                 return res.json(books);
//                  // Return to exit function after sending response
//             } catch (error) {
//                 return res.json(error); // Return to exit function after sending response
//             }
//         } else {
//             return res.status(422).send(util.apiResponse(0, toast.INVALID_FILE_FORMAT, { err: 'File format is not valid' })); // Return to exit function after sending response
//         }
//     } catch (error) {
//         console.log(error);
//         // Handle other errors appropriately
//          res.json({ error: 'Internal Server Error' }); // Return to exit function after sending response
//     }

// }

export const fileUpload1 = async (req, res, next) => {
  try {
    if (!req.files || !req.files.file) {
      return res.json("File not found"); // Return to exit function after sending response
    } else if (req.files.file.mimetype === "text/csv") {
      let csvFile = req.files.file;
      let data = await convert(csvFile);
      try {
        const books = await Lead.bulkCreate(data);
        next();
        return res.json(books); // Return to exit function after sending response
      } catch (error) {
        return res.json(error); // Return to exit function after sending response
      }
    } else {
      // Instead of directly sending a response, you can use the next() function to pass control to the next middleware or route handler
      return res
        .status(422)
        .send(
          util.apiResponse(0, toast.INVALID_FILE_FORMAT, {
            err: "File format is not valid",
          })
        );
    }
  } catch (error) {
    console.log(error);
    // Instead of sending a response directly, you can pass the error to the error handling middleware
    res.json({ error: "Internal Server Error" });
  }
};
