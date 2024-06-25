import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Tooltip from '@mui/material/Tooltip';
import PracIcon from '@mui/icons-material/Architecture';
import OnlineIcon from '@mui/icons-material/LaptopMac';
import PersonIcon from '@mui/icons-material/Person';
import WeekLegend from './WeekLegend';

export default function CourseTable({course, insList, appendCombination}) {      
    
    let rows = [];

    let combinationData = [];
    let sectionTimes = [];
    let sectionData = [];
    let tempWeekLegendString = {};


    function createData(originalSection, section, type, startTime, endTime, room, building, startDate, endDate,
        mon, tue, wed, thu, fri, sat, sun, enrollment, maxEnrollment, instructor, key
    ) {
        let datePeriod = `${startDate} - ${endDate}`;
        let weekDay = renderWeekDay(mon, tue, wed, thu, fri, sat, sun);
        let timePeriod = ' : ' + startTime + ' - ' + endTime;   
        let weekPeriod = weekDay ?? 'N/A';
        let enrollmentStatus = `${enrollment}/${maxEnrollment}`;
        instructor = instructor.replace("&#39;", "'")

        // Check if the key exists in the dictionary
        if (!tempWeekLegendString.hasOwnProperty(originalSection)) {
          // If not, initialize it with an empty array
          tempWeekLegendString[originalSection] = [];
        }

        // Now, safely push the new value into the array
        tempWeekLegendString[originalSection].push([key.slice(-7), type, weekPeriod, timePeriod].join('|'));

        console.log('In createData loop');
        console.log(section);
        console.log('tempWeekLegendString: ', tempWeekLegendString);

        return { section, type, weekPeriod, timePeriod, room, building, datePeriod, instructor, enrollmentStatus, key};
      }
    // console.log(course);
    // console.log('Instructor list inside:');  
    // console.log(insList);      

      React.useEffect(() => {
        console.log('tempWeekLegendString: ', tempWeekLegendString);
      }, [tempWeekLegendString]);



    // Loop Section Data
    course.map((classes) => {

        sectionTimes = [];
        // Loop Section Time Data
        classes.class.map((section, index) => {
            
            sectionTimes.push(section);
            // classSections[`${classes.value}-${classes.section}`] = section;
            // console.log('Class Sections:' + classes.value + '-' + classes.section);
            // console.log(classSections);

            rows.push(createData(
                `${classes.value}-${classes.section}`,
                index==0?`${classes.value}-${classes.section}`:'', 
                // `${classes.value}-${classes.section}`,
                section.type,
                section.startTime,
                section.endTime,
                section.room,
                section.building,
                section.startDate,
                section.endDate,
                section.mon,
                section.tue,
                section.wed,
                section.thu,
                section.fri,
                section.sat,
                section.sun,
                classes.enrollment,
                classes.maxEnrollment,
                insList.filter(ins => ins.key === classes.crn)[0].value || 'N/A',
                `${classes.crn}${section.mon?1:0}${section.tue?1:0}${section.wed?1:0}${section.thu?1:0}${section.fri?1:0}${section.sat?1:0}${section.sun?1:0}`
            ));

            // <WeekLegend weekString={row.key.slice(-7)} type={row.type} /><span className='text-blue-700'>{row.weekPeriod}</span><span>{row.timePeriod}
            
            // Section actions:
            // console.log(classes);
            
            // console.log(insList.filter(ins => ins.key === classes.crn)[0].value) || 'N/A';
            // console.log(insList);
        });
        // Section actions:
        sectionData.push({section: classes.value + '-' + classes.section, times: sectionTimes, weekLegendString: [...tempWeekLegendString[classes.value + '-' + classes.section]]});
      // console.log('Combination Elements:');
      // console.log(combination);            
    })
    // combinationData.push({classes: course[0].value, section: [...classSections]});
    combinationData.push({
      course: course[0].value,
      // section: Object.entries(classSections).map(([key, value]) => ({ key, value }))
      section: sectionData
    });
    appendCombination(...combinationData);
    console.log('Add Combination Elements (final):');
    console.log(combinationData);    

    function renderWeekDay(isMon, isTue, isWed, isThu, isFri, isSat, isSun) {
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
        if (output.length > 0)
          return output.join(' / ');
        else
          return null;

    }

    function renderMeetingTypeIcon(meetingType) {
        let Icon;
        let tooltip;
        let color;
        switch (meetingType) {
          case "CLAS":
            Icon = PersonIcon;
            tooltip = 'Class';
            color = 'primary';
            break;
          case "OA":
            Icon = OnlineIcon;
            tooltip = 'Online Asynchronous';
            color = 'secondary';            
            break;
          case "OS":
            Icon = OnlineIcon;
            tooltip = 'Online Synchronous';
            color = 'action';            
            break;
          case "PRAC":
            Icon = PracIcon;
            tooltip = 'Practicum';
            color = 'action';              
            break;
          // Add more cases as needed
          default:
            return meetingType;
        }
      
        return (
          <TableCell>
            <Tooltip title={tooltip} color={color}>
              <Icon />
            </Tooltip>
          </TableCell>
        );
      }
      // updateCombination({test: 'test'});

    return (
        <div>
        <div className='font-bold'><br/>{course[0].value}: {course[0].title}</div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow key={rows[0].key+'H'}>
                {/* Column header starts here */}
                <TableCell className='font-bold'>Section</TableCell>
                {/* <TableCell align="right">Type</TableCell> */}
                <TableCell align="left" className='font-bold'>Time</TableCell>
                <TableCell align="left" className='font-bold'>Instructor</TableCell>
                <TableCell align="left" className='font-bold'>Room</TableCell>
                <TableCell align="left" className='font-bold'>Building</TableCell>
                <TableCell align="left" className='font-bold'>Enrollment</TableCell>
                <TableCell align="left" className='font-bold'>Date</TableCell>
                <TableCell align="left" className='font-bold'>Class Type</TableCell>
                                
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.key}
                  // rowKey={row.key}
                  

                //   sx={row.section === '' 
                //     ? { '&:last-child td, &:last-child th': { border: 0 } } 
                //     : { '&:last-child td, &:last-child th': { border: 0 }, 'td, th': { borderTop: '0px solid black' } }
                // }


                    // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align='left' className='text-blue-700'>{row.section}</TableCell>
                  <TableCell align='left' ><WeekLegend weekString={row.key.slice(-7)} type={row.type} /><span className='text-blue-700'>{row.weekPeriod}</span><span>{row.timePeriod}</span></TableCell> 
                  <TableCell align='left'>{row.instructor}</TableCell>
                  <TableCell align='left'>{row.room}</TableCell>
                  <TableCell align='left'>{row.building}</TableCell>
                  <TableCell align='left'>{row.enrollmentStatus}</TableCell>
                  <TableCell align='left'>{row.datePeriod}</TableCell>
                  <TableCell align='left'>{renderMeetingTypeIcon(row.type)}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
      );
}



