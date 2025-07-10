const express = require('express');
const path = require('path');
const parseCsvToJson = require('./scripts/parse-csv'); // Import CSV parsing function
const loadJsonData = require('./scripts/loadJsonData'); // Import JSON loading function

const app = express();

// Paths to the CSV and resulting JSON file
const csvFilePath = path.join(__dirname, 'data', 'mock.csv');
const jsonFilePath = path.join(__dirname, 'data', 'output.json');

// Step 1: Check if JSON file exists
const fs = require('fs');
if (!fs.existsSync(jsonFilePath)) {
  // If the JSON file doesn't exist, parse the CSV and generate the JSON file
  parseCsvToJson(csvFilePath, jsonFilePath).then(() => {
    // Step 2: Load the JSON data after parsing
    const jsonData = loadJsonData(jsonFilePath);

    // Serve the JSON data as an HTML table
    app.get('/', (req, res) => {
      let table = '<table border="1"><thead><tr>';

      // Create headers based on JSON keys
      Object.keys(jsonData[0]).forEach(key => {
        table += `<th>${key}</th>`;
      });
      table += '</tr></thead><tbody>';

      // Add rows with JSON values
      jsonData.forEach(item => {
        table += '<tr>';
        Object.values(item).forEach(value => {
          table += `<td>${value}</td>`;
        });
        table += '</tr>';
      });
      table += '</tbody></table>';

      res.send(table); // Send the generated table as the response
    });

    // Start the server
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  }).catch(err => {
    console.error('Error during CSV parsing:', err);
  });
} else {
  // If the JSON file exists, just load it and start the server
  const jsonData = loadJsonData(jsonFilePath);

  // Serve the JSON data as an HTML table
  app.get('/', (req, res) => {
    let table = '<table border="1"><thead><tr>';

    // Create headers based on JSON keys
    Object.keys(jsonData[0]).forEach(key => {
      table += `<th>${key}</th>`;
    });
    table += '</tr></thead><tbody>';

    // Add rows with JSON values
    jsonData.forEach(item => {
      table += '<tr>';
      Object.values(item).forEach(value => {
        table += `<td>${value}</td>`;
      });
      table += '</tr>';
    });
    table += '</tbody></table>';

    res.send(table); // Send the generated table as the response
  });

  // Start the server
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}
