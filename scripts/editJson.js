const fs = require('fs');
const path = require('path');

// Function to edit JSON based on area-related headers
function editJsonFile(filePath) {
  // Read and parse the JSON file
  const rawData = fs.readFileSync(filePath, 'utf8');
  const jsonData = JSON.parse(rawData);

  // Get the headers (keys of the first object in the array)
  const headers = Object.keys(jsonData[0]);

  // Check if any of the headers contain the word 'area'
  const areaHeaders = headers.filter(header => header.toLowerCase().includes('area'));

  // Edit each row (object in the JSON array)
  jsonData.forEach(item => {
    // If there's any header containing "area", assess the investment status
    let isInvestment = false;

    areaHeaders.forEach(header => {
      const areaValue = item[header];

      // Example logic: If the area contains certain keywords, it's marked as an investment
      if (areaValue && (areaValue.toLowerCase().includes('new york') || areaValue.toLowerCase().includes('san francisco'))) {
        isInvestment = true;  // Mark as investment if the area is of interest
      }
    });

    // Add 'investment' field to each row
    item.investment = isInvestment;
  });

  // Save the modified JSON back to the file
  fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf8');
  console.log(`Updated JSON saved to ${filePath}`);
}

module.exports = editJsonFile;
