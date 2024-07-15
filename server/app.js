 
const express = require('express');  
const app = express();  
const csv = require('csv-parser');  
const fs = require('fs');  
  
app.use(express.static('public'));  
  
let bibleData = [];  
  
fs.readFile('kjv_strongs.csv', (err, data) => {  
  if (err) {  
   console.error(err);  
   return;  
  }  
  csv.parse(data, (err, data) => {  
   if (err) {  
    console.error(err);  
    return;  
   }  
   bibleData = data.map((row) => {  
    return {  
      Book: row['Book Name'],  
      Chapter: parseInt(row.Chapter),  
      Verse: parseInt(row.Verse),  
      Text: row.Text,  
    };  
   });  
  });  
});  
  
app.get('/search', (req, res) => {  
  const searchTerm = req.query.searchTerm;  
  const pageSize = parseInt(req.query.pageSize) || 10;  
  const pageNumber = parseInt(req.query.pageNumber) || 1;  
  const filterBook = req.query.filterBook;  
  const filterChapter = req.query.filterChapter;  
  
  let results = bibleData.filter((row) => {  
   return (  
    row.Book.toLowerCase().includes(searchTerm.toLowerCase()) ||  
    row.Text.toLowerCase().includes(searchTerm.toLowerCase())  
   );  
  });  
  
  if (filterBook) {  
   results = results.filter((row) => row.Book === filterBook);  
  }  
  
  if (filterChapter) {  
   results = results.filter((row) => row.Chapter === parseInt(filterChapter));  
  }  
  
  const totalPages = Math.ceil(results.length / pageSize);  
  const startIndex = (pageNumber - 1) * pageSize;  
  const endIndex = startIndex + pageSize;  
  const paginatedResults = results.slice(startIndex, endIndex);  
  
  res.json({  
   results: paginatedResults,  
   totalPages,  
   pageNumber,  
   pageSize,  
  });  
});  
  
app.listen(3000, () => {  
  console.log('Server started on port 3000');  
});  

