import csv from 'csvtojson';
import fs from 'fs';

// Function to parse CSV to JSON and save it
export async function parseCsvToJson(inputFile, outputFile) {
  const jsonArray = await csv().fromFile(inputFile);
  fs.writeFileSync(outputFile, JSON.stringify(jsonArray, null, 2)); // Save the JSON to a file
  console.log(`Parsed ${jsonArray.length} rows. Output written to ${outputFile}.`);
}
