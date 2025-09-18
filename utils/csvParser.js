// Imported required packages
const fs = require("fs");
const csv = require("csv-parser");

// Function to parse a CSV file into JSON objects
const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];  // Array to hold parsed CSV rows

      // Create a readable file stream from the given file path
    fs.createReadStream(filePath)
     // Pipe the file stream into csv-parser for row-by-row parsing
      .pipe(csv())
     // On each parsed row, push it into results[]
      .on("data", (data) => results.push(data))
     // When the stream ends, resolve the promise with results[]
      .on("end", () => resolve(results))
     // If any error occurs during reading/parsing, reject the promise
      .on("error", (err) => reject(err));
  });
};

// Exported the csv file to be reused
module.exports = parseCSV;
