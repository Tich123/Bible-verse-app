const express = require('express');
const app = express();
const csv = require('csv-parse');
const fs = require('fs');

app.use(express.static('public'));

let bibleData = [];

console.log('Reading file...');
fs.readFile('asv.json.csv', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('File read successfully!');
  csv.parse(data, {
    columns: true, // Assumes first row contains headers
    trim: true,    // Trim whitespace from values
  }, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Parsed data:', data);
    bibleData = data.map((row) => {
      return {
        Book: row.book_name,
        Chapter: parseInt(row.chapter),
        Verse: parseInt(row.verse),
        Text: row.text,
      };
    });
    console.log('Mapped data:', bibleData);
  });
});

app.get('/search', (req, res) => {
  // Handle search functionality
  res.send('Search endpoint');
});

app.listen(3001, () => {
  console.log('Server started on port 3001');
});

