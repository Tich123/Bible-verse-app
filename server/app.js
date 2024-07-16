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
    columns: true,
    trim: true,
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

// Search endpoint to find Bible books
app.get('/search', (req, res) => {
  const { book } = req.query;

  console.log('Search query:', book); // Add this for debugging

  if (!book) {
    return res.status(400).send('Please provide a valid book name');
  }

  const results = bibleData.filter((verse) => {
    return verse.Book.toLowerCase() === book.toLowerCase();
  });

  console.log('Search results:', results); // Add this for debugging

  res.json(results);
});

app.listen(3001, () => {
  console.log('Server started on port 3001');
});

