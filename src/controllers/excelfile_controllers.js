import path from "path";
import fs from "fs";
import XLSX from "xlsx";

const uploadExcel = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    // Use process.cwd() to get the current working directory
    const filePath = path.join(
      process.cwd(),
      "public",
      "files",
      file.originalname
    );

    // Check if the file exists at the specified path
    if (!fs.existsSync(filePath)) {
      return res.status(404).send("File not found.");
    }

    // Read the Excel file from disk
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Get the first sheet
    const worksheet = workbook.Sheets[sheetName];

    // Convert the worksheet to JSON with header row as keys
    const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // Extract headers from the first row
    const headers = excelData[0];
    if (!headers || headers.length === 0) {
      return res.status(400).send("No headers found in the Excel file.");
    }

    // Map the data to the desired JSON format using headers as keys
    const users = excelData.slice(1).map((row) => {
      const user = {};
      headers.forEach((header, index) => {
        user[header] = row[index] || "";
      });
      return user;
    });

    // Convert the JSON data to a JS format and write to users.js
    const usersJSContent = `const users = ${JSON.stringify(
      users,
      null,
      2
    )};\n\nexport default users;`;

    // Write to users.js
    const usersJSPath = path.join(process.cwd(), "src", "utils", "users.js");
    fs.writeFileSync(usersJSPath, usersJSContent, "utf8");
    fs.unlinkSync(filePath);
    res.status(200).send("File processed and written to users.js");
  } catch (error) {
    console.error("Error while processing the Excel file: ", error);

    // Return a proper response on error
    res.status(500).send("Error processing file.");
  }
};

export default uploadExcel;
