import csv
import json
import pandas as pd

# # Load the CSV files into pandas DataFrames
# df1 = pd.read_csv('item_names.csv')
# df2 = pd.read_csv('merged_file.csv')

# # Perform the left join operation
# merged_df = pd.merge(df1, df2, on='itemId', how='outer')

# # Save the merged DataFrame to a new CSV file
# merged_df.to_csv('merged_file2.csv', index=False)

def csv_to_json(csv_file, json_file):
    data = {}
    with open(csv_file, 'r', newline='') as csvfile:
        csvreader = csv.DictReader(csvfile)
        for row in csvreader:
            data[row["itemId"]]=row

    with open(json_file, 'w') as jsonfile:
        json.dump(data, jsonfile, indent=2)

if __name__ == "__main__":
    csv_file_path = "src/items.csv"
    json_file_path = "src/items.json"

    csv_to_json(csv_file_path, json_file_path)
