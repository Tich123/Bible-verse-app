import pandas as pd

# Load the CSV file
df = pd.read_csv('kjv_strongs.csv')

# Display summary of missing values
print("Summary of missing values:")
print(df.isnull().sum())

# Drop rows with any NaN values in specified columns
df_cleaned = df.dropna(subset=['Book Name', 'Chapter', 'Verse', 'Text'])

# Save the cleaned data to a new CSV file
df_cleaned.to_csv('cleaned_kjv_strongs.csv', index=False)

print("Cleaned data saved to 'cleaned_kjv_strongs.csv'")

