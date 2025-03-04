import json
import os
import requests
import shutil
import time
import threading
from dotenv import load_dotenv

load_dotenv()
base_url = os.getenv('BASE_URL')
term_code = os.getenv('TERM_CODE')
base_dir = os.getenv('RAW_DATA_DIR')

current_dir = os.path.dirname(__file__)
output_folder = os.path.join(current_dir, base_dir)

def generate_output_folder():
  """
  Create output folder
  """
  if not os.path.isdir(output_folder):
    os.mkdir(output_folder)

def index_terms(terms):
  final_terms = []
  for term in terms:
    subject_params = {
      'term': term['code'],
      'offset': 1,
      'max': 500,
    }
    subjects = requests.get(f'{base_url}/classSearch/get_subject', params=subject_params).json()
    # Let's not touch terms that have no data
    if (len(subjects) == 0):
      continue
    final_terms.append(term)
  with open(f'{output_folder}/terms.json', 'w') as terms_file:
    terms_file.write(json.dumps(final_terms))

def thread_exec(session: requests.Session, terms):
  for term in terms:
    process_term(session, term['desc'], term['code'])

def process_term(session: requests.Session, desc: str, code: str):
  subject_params = {
    'term': code,
    'offset': 1,
    'max': 500, 
  }
  # Should we force-update this quarter?
  view_only = 'View Only' in desc
  subjects = session.get(f'{base_url}/classSearch/get_subject', params=subject_params).json()
  # Let's not touch terms that have no data
  if (len(subjects) == 0):
    return
  # Conditions for updating the repo with the current data
  term_output_dir = f'{output_folder}/{code}'
  if True:
    print(f'[{threading.current_thread().name}] Grabbing data for term {desc} ({len(subjects)} subjects). Force update? {"No" if view_only else "Yes"}')
    current_time = round(time.time() * 1000)
    temp_dir = f'{output_folder}/{code}-{current_time}'
    os.mkdir(temp_dir)
    with open(f'{temp_dir}/subjects.json', 'w') as f:
      f.write(json.dumps(subjects))
    page_max_size = 500
    course_params = {
      'txt_term': code,
      'txt_subject': 'None',
      'pageOffset': 0,
      'pageMaxSize': page_max_size
    }
    for subject in subjects:
      subject_code = subject['code']
      subject_desc = subject['description']
      subject_file = open(f'{temp_dir}/{subject_code}.json', 'w')
      course_params['txt_subject'] = subject_code
      course_params['pageOffset'] = 0
      lookup = course_lookup(session, course_params).json()
      lookup_data = {
        'code': subject_code,
        'description': subject_desc,
        'entries': lookup['totalCount'],
        'data': lookup['data']
      }
      subject_file.write(json.dumps(lookup_data))
      subject_file.close()
      print(f'[{threading.current_thread().name}] {code} {subject_code} success!')
    if os.path.isdir(term_output_dir):
      shutil.rmtree(term_output_dir)
    os.rename(temp_dir, term_output_dir)
    print(f'[{threading.current_thread().name}] Successfully updated term {desc} to {term_output_dir}')

def course_lookup(session: requests.Session, lookup_params):
  session.post(f'{base_url}/term/search?mode=search&term={lookup_params["txt_term"]}')
  result = session.get(f'{base_url}/searchResults/searchResults', params=lookup_params)
  session.post(f'{base_url}/classSearch/resetDataForm')
  return result

def main():
  # Attractive start message for P1_getRawData.py
  print("----------------------------------------------------------------------------------------------------")
  print("Starting P1_getRawData.py: Fetching raw class data from the internet...")
  print("----------------------------------------------------------------------------------------------------")
  
  generate_output_folder()
  session = requests.Session()
  with open(f'{output_folder}/last_update.json', 'w') as last_update_file:
    data = {
      'last_update': round(time.time() * 1000)
    }
    last_update_file.write(json.dumps(data))
  term_params = { 
    "offset": 1,
    "max": 500,
  }
  terms = session.get(f'{base_url}/classSearch/getTerms', params=term_params).json()
  index_terms(terms)
  max_threads = 5
  term_collection = []
  threads = []
  flag_added_term = False
  thread_index = 0
  if not term_code:
    print("TERM_CODE not defined in .env. Displaying first 20 terms:")
    for t in terms[:20]:
      print(f"Code: {t['code']}, Description: {t['description']}")
  for term in terms:
    code = term['code']
    desc = term['description']
    
    # Only process that term code in .env
    if code != term_code:
      continue
    if len(term_collection) <= thread_index:
      term_collection.append([])
      flag_added_term = True
    term_collection[thread_index].append({
      'code': code,
      'desc': desc
    })
    
    # RUN_SCRIPT will output TRUE so all scripts will run
    print("RUN_ALL_SCRIPTS")
    
    thread_index += 1
    if (thread_index >= max_threads):
      thread_index = 0
  for i in range(len(term_collection)):
    t = threading.Thread(name=f'th{i}', target=thread_exec, args=(requests.Session(), term_collection[i]))
    t.start()
    threads.append(t)
  for thread in threads:
    thread.join()
  # if flag_added_term:
  #   print("FLAG_TRUE")
  # else:
  #   print("FLAG_FALSE")
  return flag_added_term

if __name__ == '__main__':
  main()
  # flag = main()
  # exit(0 if flag else 1)