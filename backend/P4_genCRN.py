import json
import os
import jmespath
import requests
from dotenv import load_dotenv

my_dict = {}
my_session = requests.Session()

load_dotenv()
base_url = os.getenv('BASE_URL')
term_code = os.getenv('TERM_CODE')
# base_dir = os.getenv('RAW_DATA_DIR')
output_dir = os.getenv('OUTPUT_DIR')

current_dir = os.path.dirname(__file__)

def join_with_space(left, right):
    return f"{left}    {right}"

def fetch_instructor(input_session, term, crn):
  result = input_session.get(f'{base_url}/searchResults/getFacultyMeetingTimes?term={term}&courseReferenceNumber={crn}').json()
  return result['fmt'][0]['faculty'][0]['displayName']

def load_instructor(crn_list):
    failed_list = {}  
    keys_to_remove = []
    cnt = 1  
    for element in crn_list:
        if element in my_dict:
            continue
        else:
            try:
                my_dict[element] = fetch_instructor(my_session, term_code, element)
                print(f'Adding instructor {cnt} - CRN: {element} - Instructor: {my_dict[element]}')
                cnt += 1
            except Exception as e:
                    # If fetching the instructor fails, add the element to the failed list
                    if element not in failed_list:
                        failed_list[element] = ''

    # Retry the failed elements
    retry = 5
    
    if retry > 0 and len(failed_list) > 0:
        for fail_ele in failed_list.keys():
            if fail_ele in my_dict:
                keys_to_remove.append(fail_ele)
                continue
            else:
                print(f'Retrying CRN {fail_ele}/{len(failed_list)} ...')
                try:
                    my_dict[fail_ele] = fetch_instructor(my_session, term_code, fail_ele)
                    print(f'Adding instructor {cnt} - CRN: {fail_ele} - Instructor: {my_dict[fail_ele]}')
                    # If the retry is successful, remove the element from the failed list
                    keys_to_remove.append(fail_ele)
                    cnt += 1
                except IndexError:
                    my_dict[fail_ele] = 'N/A'     
                    print(f'Adding instructor {cnt} - CRN: {fail_ele} - Instructor not found')
                    # If the retry is successful, remove the element from the failed list
                    keys_to_remove.append(fail_ele)
                    cnt += 1                                   
                except Exception as e:
                    print(f'Failed to fetch instructor for CRN {fail_ele} due to {str(e)}')
        for key in keys_to_remove:
            del failed_list[key]
        keys_to_remove = []
        retry -= 1

    failed_file = os.path.join(current_dir, '..', output_dir, 'failed_instructor.json')
    if len(failed_list) > 0:
        with open(failed_file, 'w') as f:
        # with open('D:\\Source\\Git\\searchsait\\public\\res\\failed_instructor.json', 'w') as f:
            f.write(json.dumps(failed_list))

# end of load_instructor ----------------------------------- 

class CustomFunctions(jmespath.functions.Functions):
    @jmespath.functions.signature({'types': ['string']}, {'types': ['string']})
    def _func_join_with_space(self, left, right):
        return join_with_space(left, right)



# Instantiate JMESPath options with the custom functions
options = jmespath.Options(custom_functions=CustomFunctions())

class_file = os.path.join(current_dir, '..', output_dir, 'class.json')
with open(class_file) as f:
# with open( 'D:\\Source\\Git\\searchsait\\public\\res\\202430.json') as f:
    data = json.load(f)
    
    path = jmespath.search(
                            '[].crn'
                        , data, options=options)
    # merged_data.extend(path)
    print(path)

load_instructor(path)

# print(my_dict)

instructor_file = os.path.join(current_dir, '..', output_dir, 'instructor.json')
with open(instructor_file, 'w') as f:
    f.write(json.dumps(my_dict))



my_session.close()
exit()

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

dropdown_file = os.path.join(current_dir, '..', output_dir, 'dropdown.json')
with open(dropdown_file, 'w') as f:
    f.write(json.dumps(unique_json))


