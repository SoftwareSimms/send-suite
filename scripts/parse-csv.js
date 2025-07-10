const csv = require('csvtojson');
const fs = require('fs');

// Function to parse CSV to JSON and save it
async function parseCsvToJson(inputFile, outputFile) {
  const jsonArray = await csv().fromFile(inputFile);
  fs.writeFileSync(outputFile, JSON.stringify(jsonArray, null, 2)); // Save JSON to outputFile
  console.log(`Parsed ${jsonArray.length} rows. Output written to ${outputFile}.`);
}

module.exports = parseCsvToJson;
