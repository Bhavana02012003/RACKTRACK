import pandas as pd

# Load the Excel file
df = pd.read_excel("Cables-ports.xlsx")

print("Available columns:", df.columns.tolist())

# Prompt for cable name
cable_name = input("Enter the Cable Name: ").strip()

# Find exact or partial match (optional flexibility)
matches = df[df['Name'].str.strip().str.lower() == cable_name.lower()]

# Display the results
if not matches.empty:
    for index, row in matches.iterrows():
        print(f"\nMatch Found:")
        print(f"Port 1: {row['Port 1']}")
        print(f"Port 2: {row['Port 2']}")
else:
    print("No match found for that cable name.")
