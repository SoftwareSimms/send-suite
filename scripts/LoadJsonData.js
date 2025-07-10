const fs = require('fs');

// Function to load the JSON file
function loadJsonData(filePath) {
  const rawData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(rawData);  // Parse the file content into JSON
}

module.exports = loadJsonData;
