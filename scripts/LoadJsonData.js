import fs from 'fs';

// Function to load the JSON file
export function loadJsonData(filePath) {
  const rawData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(rawData);  // Parse the file content into JSON
}
