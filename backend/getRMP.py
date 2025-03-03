import os
import json
import ratemyprofessor
from dotenv import load_dotenv

load_dotenv()
output_dir = os.getenv('OUTPUT_DIR')
sait_rmp_code = os.getenv('SAIT_RMP_CODE')
current_dir = os.path.dirname(__file__)

# Sample function to process names
def get_rating(name):
    professors = ratemyprofessor.get_professors_by_school_and_name(ratemyprofessor.School(sait_rmp_code), name)
    if professors is not None:
        max_professor = None 
        for prof in professors:
            if prof.name == name: 
                if max_professor is None or max_professor.num_ratings < prof.num_ratings:
                    max_professor = prof

        return max_professor        
        
    else:
        return None


# Load data from sample.json
instructor_file = os.path.join(current_dir, '..', output_dir, 'instructor.json')
with open(instructor_file, 'r') as file:
    data = json.load(file)

# Dictionary to store processed results
processed_results = {}
processed_names = set()  # Track names that have been processed
# saved_names = set()  # Track names that have been saved

processed_count = 0
valid_count = 0
# Iterate through the source JSON data
for id, name in data.items():
    
    # Replace HTML entities in the name    
    name = name.replace("&amp;", "&").replace("&#39;", "'")

    processed_count += 1
    # Skip names that contain "Contract" or are "N/A"
    if "Contract" in name or name == "N/A":
        continue

    # If name has already been processed, skip to the next item
    if name in processed_names:
        continue

    # Process the name and store the result
    professor = get_rating(name)
    
    if (professor is not None and
        professor.name == name and
        professor.num_ratings > 0 and
        professor.rating > 0):
        
        processed_results[name] = {
            "ID": professor.id,
            "rating": professor.rating
        }

        # Add name to the set of processed names
        processed_names.add(name)
        valid_count += 1
        print(f"Processed: {processed_count} Valid data: {valid_count} {name} - Rating: {professor.rating}")
        

# Save the processed results to output.json
RMP_file = os.path.join(current_dir, '..', output_dir, 'RMP.json')
with open(RMP_file, 'w') as outfile:
    json.dump(processed_results, outfile, indent=4)

print("Processing complete. Results saved to output.json.")


