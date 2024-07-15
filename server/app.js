 
const express = require('express');  
const app = express();  
const csv = require('csv-parse');  
const fs = require('fs');  
  
app.use(express.static('public'));  
  
let bibleData = [];  


console.log('Reading file...');
fs.readFile('kjv_strongs.csv', (err, data) => {
  if (err) {
   console.error(err);
   return;
  }
  console.log('File read successfully!');
  csv.parse(data, (err, data) => {
   if (err) {
    console.error(err);
    return;
   }
   console.log('Parsed data:', data);
   bibleData = data.map((row) => {
    return {
      Book: row['Book Name'],
      Chapter: parseInt(row.Chapter),
      Verse: parseInt(row.Verse),
      Text: row.Text,
    };
   });
   console.log('Mapped data:', bibleData);
  });
});
  
app.get('/search', (req, res) => {  
  //...  
});  
  
app.listen(3000, () => {  
  console.log('Server started on port 3000');  
});  

