import json
import os
import jmespath
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()
term_code = os.getenv('TERM_CODE')
base_dir = os.getenv('RAW_DATA_DIR')
output_dir = os.getenv('OUTPUT_DIR')

current_dir = os.path.dirname(__file__)


def join_with_space(left, right):
    return f"{left}    {right}"

class CustomFunctions(jmespath.functions.Functions):
    @jmespath.functions.signature({'types': ['string']}, {'types': ['string']})
    def _func_join_with_space(self, left, right):
        return join_with_space(left, right)

# Instantiate JMESPath options with the custom functions
options = jmespath.Options(custom_functions=CustomFunctions())

# directory = "api/v1/202430/"
directory = f"{base_dir}/{term_code}/"
files = os.listdir(directory)
json_files = [f for f in files if f.endswith('.json') and f != 'subjects.json']

merged_data = []
merged_data2 = []
for file in json_files:

    with open( directory + file) as f:
        data = json.load(f)


    path = jmespath.search(
                            'data[*].{label: join_with_space(join(``, [@.subject, @.courseNumber]), @.courseTitle),'
                            'group: subject'
                            '}'
                        , data, options=options)
    merged_data.extend(path)

# Eliminate duplicates by using a set to track seen "value" elements
seen_values = set()
unique_data = []

for item in merged_data:
    value = item["label"]
    if value not in seen_values:
        seen_values.add(value)
        unique_data.append(item)


unique_json = {
    "data": unique_data
}

output_file = os.path.join(current_dir, '..', output_dir, 'dropdown.json')
with open(output_file, 'w') as f:
    f.write(json.dumps(unique_data))

# After your unique_json has been created and written to dropdown.json

# Prepare the current date and time
current_time = datetime.now().isoformat()  # Format: YYYY-MM-DDTHH:MM:SS

# Define the path for the server_log.json
log_file_path = os.path.join(current_dir, '..', output_dir, 'server_log.json')

# Load existing server_log.json or create a new structure if it doesn't exist
if os.path.exists(log_file_path):
    with open(log_file_path, 'r') as log_file:
        log_data = json.load(log_file)
else:
    log_data = {"update_log": {}}

# Get current date and time with local timezone info
current_time_local = datetime.now().astimezone()
formatted_time_local = current_time_local.isoformat()  # Outputs in ISO 8601 format

# Update the lastUpdateTime
log_data["update_log"]["lastUpdateTime"] = formatted_time_local

# Write the updated log back to server_log.json
with open(log_file_path, 'w') as log_file:
    json.dump(log_data, log_file, indent=4)
