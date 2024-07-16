 
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
import pandas as pd

# Load the CSV file
df = pd.read_csv('path/to/your/kjvmindata.csv')

# Display rows with missing or NaN values
missing_data = df[df.isnull().any(axis=1)]
print("Rows with missing or NaN values:")
print(missing_data)

# Optionally, drop rows with missing or NaN values
df_cleaned = df.dropna()

# Save the cleaned data to a new CSV file
df_cleaned.to_csv('path/to/your/cleaned_kjvmindata.csv', index=False)

print("Cleaned data saved to 'cleaned_kjvmindata.csv'")

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
  
app.listen(3001, () => {  
  console.log('Server started on port 3001');  
});  

