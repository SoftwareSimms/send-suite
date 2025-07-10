import express from 'express';
import path from 'path';
import { loadJsonData } from './scripts/loadJsonData.js';  // Import module to load JSON
import { saveJsonData } from './scripts/saveJsonData.js';  // Import module to save JSON

const app = express();

// Enable express to parse incoming JSON
app.use(express.json());

// Path to the resulting JSON file
const jsonFilePath = path.join('data', 'output.json');

// Serve the JSON data as an HTML table
app.get('/', (req, res) => {
  // Load the current JSON data when the page is loaded
  let jsonData = loadJsonData(jsonFilePath);
  let table = '<table id="json-table" border="1"><thead><tr>';

  // Create headers based on JSON keys
  Object.keys(jsonData[0]).forEach(key => {
    table += `<th>${key}</th>`;
  });
  table += '<th>Toggle</th></tr></thead><tbody>';

  // Add rows with JSON values
  jsonData.forEach((item, index) => {
    table += `<tr>`;
    Object.values(item).forEach(value => {
      table += `<td>${value}</td>`;
    });
    // Add a checkbox to toggle the boolean
    table += `<td><input type="checkbox" class="toggle-checkbox" data-index="${index}" ${item.toggle ? 'checked' : ''}></td>`;
    table += `</tr>`;
  });
  table += '</tbody></table>';

  // Add a "Save" button that will trigger the save action
  table += `
    <button onclick="saveJson()">Save</button>
    <script>
      // Function to handle toggling the checkbox
      document.querySelectorAll('.toggle-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (event) => {
          const rowIndex = event.target.getAttribute('data-index');
          jsonData[rowIndex].toggle = event.target.checked; // Toggle the value in jsonData
        });
      });

      // Function to save the updated JSON data
      const saveJson = async () => {
        console.log('Data being saved:', jsonData);  // Log the data before sending
        try {
          const response = await fetch('/save', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),  // Send updated data
          });

          const result = await response.json();
          alert('Data saved!');
        } catch (error) {
          console.error('Error:', error);
        }
      }

      let jsonData = ${JSON.stringify(jsonData)}; // Inject current JSON data into JS
    </script>
  `;

  res.send(table); // Send the generated table as the response
});

// Save endpoint to update and save JSON data
app.post('/save', (req, res) => {
  const updatedData = req.body;  // Get updated JSON data from the request
  console.log('Updated Data:', updatedData);  // Log to check the data
  if (!updatedData) {
    return res.status(400).json({ message: 'Invalid data received' });
  }
  saveJsonData(jsonFilePath, updatedData); // Save the updated data to the JSON file
  res.json({ message: 'JSON saved successfully!' });
});

// Start server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
