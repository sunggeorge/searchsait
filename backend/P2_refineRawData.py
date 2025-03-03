import json
import os
import jmespath
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

directory = f"{base_dir}/{term_code}/"
files = os.listdir(directory)
json_files = [f for f in files if f.endswith('.json') and f != 'subjects.json']

merged_data = []
# merged_data2 = []
for file in json_files:

    with open( directory + file) as f:
        data = json.load(f)



    path = jmespath.search(
                            'data[*].{value: join(``, [@.subject, @.courseNumber]),'
                            'subject: subject,'
                            'section: sequenceNumber,'
                            'title: courseTitle,'
                            'id: id,'
                            'crn: courseReferenceNumber,'
                            'maxEnrollment: maximumEnrollment,'
                            'enrollment: enrollment,'
                            'class: meetingsFaculty[].meetingTime[].{'
                            'type: meetingType,'
                            'startTime: beginTime,'
                            'endTime: endTime,'
                            'startDate: startDate,'
                            'endDate: endDate,'
                            'building: buildingDescription,'
                            'room: room,'
                            'mon: monday,'
                            'tue: tuesday,'
                            'wed: wednesday,'
                            'thu: thursday,'
                            'fri: friday,'
                            'sat: saturday,'
                            'sun: sunday'
                            '}}'
                        , data)
    merged_data.extend(path)

output_file = os.path.join(current_dir, '..', output_dir, 'class.json')
with open(output_file, 'w') as f:
    f.write(json.dumps(merged_data))
    
    