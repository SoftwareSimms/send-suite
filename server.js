import express from 'express';
import multer from 'multer';
import csvParser from 'csv-parser';
import fs from 'fs';
import path from 'path';

const app = express();

// Set up multer for file uploads (uploads to the 'uploads' folder)
const upload = multer({ dest: 'uploads/' });

// Serve the file upload form (index.html)
app.use(express.static('public'));

// Handle the file upload
app.post('/upload', upload.single('csvFile'), (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.file.filename);
  const results = [];

  // Read and parse the CSV file
  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      // Generate the HTML table from the CSV data
      let table = `<table border="1"><thead><tr>`;

      // Table headers (columns)
      Object.keys(results[0]).forEach((key) => {
        table += `<th>${key}</th>`;
      });
      table += `</tr></thead><tbody>`;

      // Table rows (data)
      results.forEach((row) => {
        table += `<tr>`;
        Object.values(row).forEach((value) => {
          table += `<td>${value}</td>`;
        });
        table += `</tr>`;
      });
      table += `</tbody></table>`;

      // Send the table as HTML
      res.send(table);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
