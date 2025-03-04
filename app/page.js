'use client'
import * as React from 'react';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useAtom } from 'jotai';
import { ratingsAtom } from './stateAtoms.js';
import { getTimeAgo } from './functions/getTimeAgo.js';
import jsonData from '@/public/res/dropdown.json';
import CourseTableList from './components/CourseTableList.js';
  
export default function CheckboxesTags() {
    // Convert the object to an array if it's not already
    const [shortlist, setShortlist] = useState([]); 
    const [classList, setClassList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [instructorList, setInstructorList] = useState([]);
    const [dropDownSelectedValue, setDropDownSelectedValue] = useState([]); 
    const [lastUpdateTime, setLastUpdateTime] = useState('');
    const [, setRatings] = useAtom(ratingsAtom);

    const MAX_SELECTION = 5;

    let classJsonData;
    let instructorJsonData;
    let server_data;
    const data = jsonData.map(item => ({
      ...item,
      label: item.label.replace(/&amp;/g, '&').replace(/&#39;/g, "'")
    }));


    useEffect(() => {
      const fetchData = async () => {
        const module = await import('@/public/res/class.json');
        classJsonData = module.default;
        const data = Array.isArray(classJsonData) ? classJsonData : Object.values(classJsonData);
        setClassList(data);

        // load dictionary
        const module_ins = await import('@/public/res/instructor.json');
        instructorJsonData = module_ins.default;
        const data_ins = Array.isArray(instructorJsonData) ? instructorJsonData : Object.entries(instructorJsonData).map(([key, value]) => ({key, value}));
        setInstructorList(data_ins);    
        // console.log('Instructor list: ' + instructorJsonData.length);  
        // console.log(instructorList);  
        const RMP_data = await import('@/public/res/RMP.json');
        setRatings(RMP_data);
        // console.log('RMP data:', RMP_data);      
        server_data = await import('@/public/res/server_log.json');
        setLastUpdateTime(server_data.update_log.lastUpdateTime);
        // console.log('Server data:', server_data);
      };
  
      fetchData();
    }, []);

     // When selected classes changed
    const handleAutocompleteChange = (event, value) => {
      // console.log('Selected value: ' + value.length);
      // console.log('Instructor list: ' + instructorList.length);  
      // console.log(instructorList);  

      // Check for duplicate labels
      if (value.length <= MAX_SELECTION) {

        setDropDownSelectedValue(value);

        const labels = value.map(item => item.label);
        const uniqueLabels = new Set(labels);
        if (labels.length !== uniqueLabels.size) {
          console.log('Duplicate label found, exiting function.');
          return; // Exit the function if a duplicate label is found
        }

        if (value.length > 0) {


          const sortedValue = [...value].sort((a, b) => a.label.localeCompare(b.label));
          // console.log('Sorted value: ');
          // console.log(sortedValue);

          const selectedList = sortedValue.map(item => ({
            'value': item.label,
            'key': item.label.split(' ')[0]
          }));        
          // console.log('Shortlist value: ' + selectedList.length);   
          // console.log('class list');
          // console.log(classList);
          // console.log('select list');        
          // console.log(selectedList);

          // Filter class list with shortlist
          const tempList = classList.filter(item => {
            return selectedList.some(selectedItem => selectedItem.key === item.value);
          });
          const sortedList = [...tempList].sort((a, b) => a.value.localeCompare(b.value) || a.section.localeCompare(b.section));
          setFilteredList(sortedList);
          // console.log('Filtered list: ' + sortedList.length);
        } else {
            setShortlist([]);
            setFilteredList([]);
        }
      } else {
        alert(`You can only select up to ${MAX_SELECTION} courses.`);
      }
      

    };


    return (

      <div className='bg-teal-100 w-svw min-h-screen text-black'>
      <div className='p-10 mx-auto w-4/5 text-black'>  
      <h1 className='mx-auto w-4/5 text-center'><p>SAIT Course Offerings (2025 Winter)</p></h1>
      <p className="text-center font-light text-gray-600 text-sm">{getTimeAgo(lastUpdateTime)}</p>
      <Autocomplete className='m-5 mx-auto w-1/2'
        disablePortal
        disableCloseOnSelect
        multiple
        id="combo-box-demo"
        options={data}
        value={dropDownSelectedValue}  
        sx={{ width: 300 }}
        isOptionEqualToValue={(option, value) => option.label === value.label}
        onChange={handleAutocompleteChange} 
        renderInput={(params) => 
          <TextField {...params} 
          placeholder = "Search by course code or name"
          />}
      />
      <CourseTableList courseList={filteredList} insList={instructorList}/>

    </div>
    </div>
    
    );
}
  