#!/usr/bin/env python3
"""
Simple script to convert Excel file to CSV without pandas dependency issues
"""
import csv
import sys

def convert_excel_to_csv():
    try:
        # Try to import pandas
        import pandas as pd
        
        # Try different Excel file names
        excel_files = ["Cables-ports 1.xlsx", "Cables-ports.xlsx"]
        
        for excel_file in excel_files:
            try:
                df = pd.read_excel(excel_file)
                print(f"Successfully read {excel_file}")
                print(f"Columns: {df.columns.tolist()}")
                print(f"Shape: {df.shape}")
                
                # Convert to CSV
                csv_file = "cables-ports.csv"
                df.to_csv(csv_file, index=False)
                print(f"Converted to {csv_file}")
                
                # Show sample data
                print("\nSample data:")
                print(df.head().to_string())
                return True
                
            except FileNotFoundError:
                print(f"File {excel_file} not found")
                continue
            except Exception as e:
                print(f"Error reading {excel_file}: {e}")
                continue
        
        print("No Excel files could be read")
        return False
        
    except ImportError as e:
        print(f"Import error: {e}")
        return False

if __name__ == "__main__":
    convert_excel_to_csv()