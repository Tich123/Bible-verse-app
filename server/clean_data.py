import pandas as pd

# Load the CSV file
df = pd.read_csv('/Bible-verse-app/server/kjv_strongs.csv')

# Display rows with missing or NaN values
missing_data = df[df.isnull().any(axis=1)]
print("Rows with missing or NaN values:")
print(missing_data)

# Drop rows with missing or NaN values
df_cleaned = df.dropna()

# Save the cleaned data to a new CSV file
df_cleaned.to_csv('/Bible-verse-app/server/kjv_strongs.csv', index=False)

print("Cleaned data saved to 'cleaned_kjv_strongs.csv’")

