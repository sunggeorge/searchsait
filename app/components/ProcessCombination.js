'use client'
import React, { useEffect, useState } from 'react';

import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import WeekLegend from './WeekLegend';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


export default function ProcessCombination({selCombo}) {
    
    const [comboCnt, setComboCnt] = useState(0);
    const [validComboCnt, setValidComboCnt] = useState(0);
    const [resultCombo, setResultCombo] = useState([]);
    const [validCombo, setValidCombo] = useState([]);
    const [preSelCombo, setPreSelCombo] = useState([]);
    const [sectionDropDownList, setSectionDropDownList] = useState([]);
    const [dropDownSelectedValue, setDropDownSelectedValue] = useState([]);
    const [displayedCombo, setDisplayedCombo] = useState([]);
    const [displayedComboContent, setDisplayedComboContent] = useState([]);


    useEffect(() => {

        if (selCombo.length > 0) {

            // Eliminate duplicate elements based on the "course" property
            const uniqueCombinations = selCombo.reduce((acc, current) => {
                const x = acc.find(item => item.course === current.course);
                if (!x) {
                return acc.concat([current]);
                } else {
                return acc;
                }
            }, []);        

            // console.log('Unique Combinations:'); 
            // console.log(uniqueCombinations);
            
            let fullCombo = [];
            // Usual way of generating combinations            
            if (uniqueCombinations.length < 3){
                fullCombo = generateCombinations(uniqueCombinations);

            // Quick combination for more than  2 unique courses
            } else {
                const newSections = findExtraMemberSection(preSelCombo, uniqueCombinations);
                if(!newSections){
                    fullCombo = generateCombinations(uniqueCombinations);
                } else {
                    // console.log('Quick combination');
                    // console.log(newSections);
                    // console.log(resultCombo);
                    for (let sections of validCombo) {
                        for (let newSection of newSections) {
                            fullCombo.push([...sections, newSection]);
                        }
                    }
                }

            }


                // console.log('Full Combination:');
                // console.log(fullCombo);
                setComboCnt(getNumOfCombination(uniqueCombinations));
                setResultCombo(fullCombo);

                const tempValidCombo = getValidCombinations(fullCombo);
                setValidCombo(tempValidCombo);
                setValidComboCnt(tempValidCombo.length);
                setPreSelCombo(uniqueCombinations);
                setSectionDropDownList(getSectionDropDown(uniqueCombinations));

                // console.log('Valid Combination:');
                // console.log(tempValidCombo);
            

        } else {
            setComboCnt(0);
            setValidComboCnt(0);
            setResultCombo([]);
            setSectionDropDownList([]);
            setDropDownSelectedValue([]);            
            setDisplayedCombo([]);
        }
    }, [selCombo]);

    function getWeekLegendFromString(inputString) {
      tempSplit = inputString.split('|');
      return `<WeekLegend weekString=${tempSplit[0]} type=${tempSplit[1]} />
          <span className='text-blue-700'>${tempSplit[2]}</span><span>${tempSplit[3]}</span>`;
    }

    function getNumOfCombination(array) {
        let numOfCombination = 1; 
      
        array.forEach(member => {
          if (member.section && Array.isArray(member.section)) {
            numOfCombination *= member.section.length;
          }
        });
      
        return numOfCombination;
      }

    function findExtraMemberSection(oldArray, newArray) {
        // Check if newArray is exactly 1 element longer than oldArray
        if (newArray.length !== oldArray.length + 1) {
          return null;
        }
      
        // Create a copy of newArray to safely modify it
        let newArrayCopy = [...newArray];
      
        // Iterate through oldArray to find and remove matching elements in newArrayCopy
        for (let oldElement of oldArray) {
          const matchIndex = newArrayCopy.findIndex(newElement => newElement.course === oldElement.course);
          if (matchIndex === -1) {
            // No matching element found, return null
            return null;
          }
          // Remove the found match from newArrayCopy
          newArrayCopy.splice(matchIndex, 1);
        }
      
        // Check if exactly one element is left in newArrayCopy
        if (newArrayCopy.length === 1) {
          return newArrayCopy[0].section; // Return the "section" of the extra member
        } else {
          return null; // No extra member found or an unexpected number of elements left
        }
      }

    function getValidCombinations(comboList) {

        let validCombos = [];

        for (const combo of comboList) {

            if (isValidCombination(combo)) {
                validCombos.push(combo);
            }
        }
        return validCombos;
    }    

    function isValidCombination(inputCombo) {


        let times = {};
        let weekDayList = [];
        let timeList = [];
        let tempKey = '';
        // console.log('Input Combination:');
        // console.log(inputCombo);

            for (const section of inputCombo) {
                for (const time of section.times) {
                    weekDayList = getWeekDayList(time.mon, time.tue, time.wed, time.thu, time.fri, time.sat, time.sun);
                    // console.log(time.startTime + time.endTime);
                    timeList = getTimeList(time.startTime, time.endTime);
                    // console.log(timeList);
                    if(weekDayList.length === 0 || timeList.length === 0)
                        return false;
                    for (const weekDay of weekDayList) {
                        for (const timeSlot of timeList) {
                            tempKey = `${weekDay}-${timeSlot}`;
                            if (times[tempKey]) {
                                return false;
                            } else {
                                times[tempKey] = 1;
                            }
                        }

                    }
    
                }
            }
            return true;    

    }   

    function getWeekDayList(isMon, isTue, isWed, isThu, isFri, isSat, isSun) {
        let output = []
        if(isMon)
            output.push('Mon');
        if(isTue)
            output.push('Tue');
        if(isWed)
            output.push('Wed');
        if(isThu)
          output.push('Thu');
        if(isFri)
          output.push('Fri');
        if(isSat)
          output.push('Sat');
        if(isSun)
          output.push('Sun');
        // console.log('Weekday List:');
        // console.log(output);
        if (output.length > 0)
          return output;
        else
          return [];

    }

    function getTimeList(startTime, endTime) {
        // console.log(startTime + ' ' + endTime);
        if (startTime === null && endTime === null) 
            return [];
        let startHour = parseInt(startTime.substring(0, 2), 10);
        let startMin = parseInt(startTime.substring(2, 4), 10);
        let endHour = parseInt(endTime.substring(0, 2), 10);
        let endMin = parseInt(endTime.substring(2, 4), 10);
        let timeSlots = [];
      
        // Handle start time slot
        if (startMin < 30) {
          timeSlots.push(`${startHour.toString().padStart(2, '0')}00`);
          timeSlots.push(`${startHour.toString().padStart(2, '0')}30`);
        } else {
          timeSlots.push(`${startHour.toString().padStart(2, '0')}30`);
        }
      
        // Increment start hour for looping
        startHour++;
      
        // Generate time slots until reaching the end hour
        while (startHour < endHour) {
          timeSlots.push(`${startHour.toString().padStart(2, '0')}00`);
          timeSlots.push(`${startHour.toString().padStart(2, '0')}30`);
          startHour++;
        }
      
        // Handle final part based on end time
        if (endMin === 0) {
          // Do nothing
        } else if (endMin < 30) {
          timeSlots.push(`${endHour.toString().padStart(2, '0')}00`);
        } else {
          timeSlots.push(`${endHour.toString().padStart(2, '0')}00`);
          timeSlots.push(`${endHour.toString().padStart(2, '0')}30`);
        }
      
        return timeSlots;
      }

    function generateCombinations(parents) {
        const results = [];

        function combine(currentCombination, parentIndex) {
            // Base case: If current combination is complete, add it to results
            if (parentIndex === parents.length) {
            results.push([...currentCombination]);
            return;
            }

            const parent = parents[parentIndex];
            for (const child of parent.section) {
            // Add current child to the combination
            currentCombination[parentIndex] = child;
            // Recurse to the next parent
            combine(currentCombination, parentIndex + 1);
            }
        }


        combine([], 0);
        return results;
    }
    
    function getSectionDropDown(inputArray) {
        const result = [];
      
        // Loop through each object in the input array
        inputArray.forEach(item => {
          // Loop through each section in the current item's section array
          item.section.forEach(sectionItem => {
            // Create a new object with the required format and push it into the result array
            result.push({
              section: sectionItem.section,
              course: item.course
            });
          });
        });
      
        return result;
      }

      function filterValidComboByDropDown(validCombo, dropDownSelectedValue) {
        const result = [];
      
        // Extract section values from dropDownSelectedValue for easier comparison
        const dropDownSections = dropDownSelectedValue.map(item => item.section);
      
        // Loop through each member of validCombo
        validCombo.forEach(combo => {
          // Check if all sections in combo are present in dropDownSections
          const allSectionsMatch = combo.every(comboSection =>
            dropDownSections.includes(comboSection.section)
          );
      
          // If all sections match, push the combo to the result array
          if (allSectionsMatch) {
            result.push(combo);
          }
        });
      
        return result;
      }

    const onDropDownChangeHandler = (event, newValue) => {
        setDisplayedCombo(filterValidComboByDropDown(validCombo, newValue));
        setDropDownSelectedValue(newValue);
    };

    function displayWeekLegendFromString(inputString) {
        const tempSplit = inputString.split('|');
        return `${<WeekLegend weekString={tempSplit[0]} type={tempSplit[1]}/>}`
           + `<span className='text-blue-700'>${tempSplit[2]}</span><span>${tempSplit[3]}</span>`
         
        
    }

    useEffect(() => {
      // console.log('Displayed Combo Content:');
      // console.log(displayedComboContent);
    }, [displayedCombo]);

    return (
        <div>
                <div className='flex justify-around items-center text-center mb-5'>
                    <div>
                        <h2>Total Possible Combination: {comboCnt}</h2>
                        <h2>Valid Combination: {validComboCnt}</h2>
                        <h2>Displayed Combination: {displayedCombo.length}</h2>
                    </div>
                    <div>
                       
                        <Autocomplete
                            multiple
                            id="checkboxes-sections"
                            options={sectionDropDownList}
                            disableCloseOnSelect
                            groupBy={(option) => option.course}
                            getOptionLabel={(option) => option.section}
                            onChange={onDropDownChangeHandler}
                            isOptionEqualToValue={(option, value) => option.section === value.section}
                            value={dropDownSelectedValue}                             
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {option.section}
                                </li>
                            )}
                            style={{ width: 500 }}
                            renderInput={(params) => (
                                <TextField {...params} label="Choose combination sections" placeholder="Please choose sections" />
                            )}
                            />


                    </div>
                </div> 
                
                <div className='text-center flex flex-row flex-wrap items-center justify-center'>
                  {displayedCombo.map((item, index1) => {
                    // Moved the logic outside of the return statement
                    // console.log('All Week Legend Strings:', item);
                    const allWeekLegendStrings = item.map(s => s.weekLegendString.map(wls => `${s.section}: ${wls.split('|')[2]}${wls.split('|')[3]}`).join('\n')).join('\n');
                    // console.log('All Week Legend Strings:', allWeekLegendStrings);

                    return (
                      <div key={item.id} className='m-5 p-5 bg-green-200 rounded-xl drop-shadow-lg text-xs flex flex-col items-center'>
                        <pre>{allWeekLegendStrings}</pre>

                        <div className='m-2'>
                        {item.map((section, index2) => {
                          return section.weekLegendString.map((wls, wlsIndex) => {
                            const tempSplit = wls.split('|');
                            return (
                              <div key={`${index1}-${index2}-${wlsIndex}`}> {/* Updated key to include wlsIndex */}
                                <div>
                                  <WeekLegend weekString={tempSplit[0]} type={tempSplit[1]} />
                                </div>
                              </div>
                            );
                          });
                        })}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
              </div>
    )
};