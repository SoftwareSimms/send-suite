const express = require('express');
const parseCsvToJson = require('./scripts/parse-csv');

const app = express();
const PORT = 3000;

// Convert CSV to JSON on server start (like main init)
parseCsvToJson('./data/new-hire-list.csv', './data/toOnboard.json')
  .then(() => {
    console.log('CSV parsed to JSON successfully. Server starting...');
    
    // Start the server after parsing is done
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error parsing CSV:', err);
  });

// Define routes here
app.get('/', (req, res) => {
  res.send('Hello, onboarding pipeline!');
});
