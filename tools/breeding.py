import csv
import json

# Replace 'your_file.csv' with the actual path to your CSV file
csv_file_path = './tools/breeding.csv'

# Replace 'your_json_file.json' with the actual path to your JSON file
json_file_path = './src/assets/pals.json'

# Load the JSON file into a dictionary
with open(json_file_path, 'r') as json_file:
    json_data = json.load(json_file)

def find_alternative_key(json_data, name):
    for key, alternative_value in json_data.items():
        if alternative_value == name:
            return key
    return None

output_data = {}

# Open the CSV file
with open(csv_file_path, 'r') as csv_file:
    # Create a CSV reader
    csv_reader = csv.reader(csv_file)
    
    # Read the header row
    headers = next(csv_reader)

    # Loop through the remaining rows
    for row in csv_reader:
        # Extract the row key (assuming it's in the first column)
        row_key = row[0]

        row_id = find_alternative_key(json_data, row_key)

        # Loop through the columns and extract header, row key, and value
        for header, value in zip(headers, row):

            header_id = find_alternative_key(json_data, header)

            if header_id is None:
                continue
            
            value_id = find_alternative_key(json_data, value)

            print(f"Header: {header_id}, Row Key: {row_id}, Value: {value_id}")

            if header_id not in output_data:
                output_data[header_id] = {}

            if row_id not in output_data[header_id]:
                output_data[header_id][row_id] = value_id
            
# Write the updated JSON data to the file
with open('./src/assets/breeding.json', 'w') as updated_json_file:
    json.dump(output_data, updated_json_file, indent=2)