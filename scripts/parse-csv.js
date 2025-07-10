// scripts/parse-csv.js

const csv = require('csvtojson');
const fs = require('fs');

async function parseCsvToJson(inputFile, outputFile) {
  const jsonArray = await csv().fromFile(inputFile);
  fs.writeFileSync(outputFile, JSON.stringify(jsonArray, null, 2));
  console.log(`Parsed ${jsonArray.length} rows. Output written to ${outputFile}.`);
}

module.exports = parseCsvToJson;
