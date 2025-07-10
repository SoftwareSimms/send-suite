import fs from 'fs';

// Function to save the JSON data to a file
export function saveJsonData(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8'); // Save JSON to file
}
