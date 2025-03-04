import json

# Load data from the input JSON file
with open('D:\\Source\\Git\\searchsait\\public\\res\\RMP.json', 'r') as file:
    data = json.load(file)

# Calculate total records
total_records = len(data)

# Filter out records with a rating of 0
filtered_data = {name: info for name, info in data.items() if info.get("rating") != 0}

# Calculate the number of records filtered out
filtered_out_count = total_records - len(filtered_data)

# Save the filtered data back to the file (or another file if preferred)
with open('D:\\Source\\Git\\searchsait\\public\\res\\RMP_Rev.json', 'w') as file:
    json.dump(filtered_data, file, indent=4)

# Output the results
print(f"Filtered out {filtered_out_count} records out of {total_records} total records.")
