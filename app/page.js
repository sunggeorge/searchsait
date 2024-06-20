'use client'
import * as React from 'react';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import jsonData from '@/public/res/dropdown.json';
import CourseTable from './components/CourseTable.js';
import CourseTableList from './components/CourseTableList.js';
  
export default function CheckboxesTags() {
    // Convert the object to an array if it's not already
    const [shortlist, setShortlist] = useState([]); 
    const [classList, setClassList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);


    let classJsonData;
    const data = Array.isArray(jsonData['data']) ? jsonData['data'] : Object.values(jsonData['data']);  

    useEffect(() => {
      const fetchData = async () => {
        const module = await import('@/public/res/202420.json');
        classJsonData = module.default;
        const data = Array.isArray(classJsonData) ? classJsonData : Object.values(classJsonData);
        setClassList(data);
        // console.log(data.length);
      };
  
      fetchData();
    }, []);

     // When selected classes changed
    const handleAutocompleteChange = (event, value) => {
      console.log('Selected value: ' + value.length);

      if (value.length > 0) {
        const sortedValue = [...value].sort((a, b) => a.label.localeCompare(b.label));


        const selectedList = sortedValue.map(item => ({
          'value': item.label,
          'key': item.label.split(' ')[0]
        }));        
        console.log('Shortlist value: ' + selectedList.length);   
        console.log('class list');
        console.log(classList);
        console.log('select list');        
        console.log(selectedList);

        // Filter class list with shortlist
        const tempList = classList.filter(item => {
          return selectedList.some(selectedItem => selectedItem.key === item.value);
        });
        const sortedList = [...tempList].sort((a, b) => a.value.localeCompare(b.value) || a.section.localeCompare(b.section));
        setFilteredList(sortedList);
        console.log('Filtered list: ' + sortedList.length);
      } else {
        setShortlist([]);
        setFilteredList([]);
      }


    };

    return (


      <div className='bg-teal-100 w-svw min-h-screen text-black'>
      <div className='p-10 mx-auto w-4/5 text-black'>  
      <h1 className='mx-auto w-4/5'><p>SAIT Course Offerings (2024 Fall)</p></h1>
      <Autocomplete className='m-5 mx-auto w-1/2'
        disablePortal
        disableCloseOnSelect
        multiple
        id="combo-box-demo"
        options={data}
        sx={{ width: 300 }}
        onChange={handleAutocompleteChange} // Add this line
        renderInput={(params) => 
          <TextField {...params} 
          // label="Browse Course Offerings" 
          placeholder = "Search by course code or name"
          />}
      />

          <CourseTableList courseList={filteredList}/>


    </div>
    </div>

    );
}
  