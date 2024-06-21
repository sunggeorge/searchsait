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

export default function CourseTable({course, insList}) {      
    
    let rows = [];

    function createData(section, type, startTime, endTime, room, building, startDate, endDate,
        mon, tue, wed, thu, fri, sat, sun, instructor, key
    ) {
        let datePeriod = `${startDate} - ${endDate}`;
        let weekDay = renderWeekDay(mon, tue, wed, thu, fri, sat, sun);
        let timePeriod = `${weekDay && startTime ? weekDay + ' : ' + startTime + ' - ' + endTime: ''}`;   
        return { section, type, timePeriod, room, building, datePeriod, instructor, key};
      }
    // console.log(course);
    // console.log('Instructor list inside:');  
    // console.log(insList);      



    course.map((classes) => {
        classes.class.map((section, index) => {
            rows.push(createData(
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
                insList.filter(ins => ins.key === classes.crn)[0].value || 'N/A',
                `${classes.crn}${section.mon?1:0}${section.tue?1:0}${section.wed?1:0}${section.thu?1:0}${section.fri?1:0}${section.sat?1:0}${section.sun?1:0}`
            ));
            console.log(classes.crn);
            console.log(insList.filter(ins => ins.key === classes.crn)[0].value) || 'N/A';
            console.log(insList);
        });
    })

    function renderWeekDay(isMon, isTue, isWed, isThu, isFri, isSat, isSun) {
        if(isMon)
            return 'Mon';
        else if(isTue)
            return 'Tue';
        else if(isWed)
            return 'Wed';
        else if(isThu)
            return 'Thu';
        else if(isFri)
            return 'Fri';
        else if(isSat)
            return 'Sat';
        else if(isSun)
            return 'Sun';
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


    return (
        <div>
        <div className='font-bold'><br/>{course[0].value}: {course[0].title}</div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                {/* Column header starts here */}
                <TableCell>Section</TableCell>
                {/* <TableCell align="right">Type</TableCell> */}
                <TableCell align="left">Time</TableCell>
                <TableCell align="left">Instructor</TableCell>
                <TableCell align="left">Room</TableCell>
                <TableCell align="left">Building</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Class Type</TableCell>
                                
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.key}
                  

                //   sx={row.section === '' 
                //     ? { '&:last-child td, &:last-child th': { border: 0 } } 
                //     : { '&:last-child td, &:last-child th': { border: 0 }, 'td, th': { borderTop: '0px solid black' } }
                // }


                    // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align='left' className='text-blue-700'>{row.section}</TableCell>

                  {row.type === 'CLAS' ?
                    <TableCell align='left' className='text-blue-700'>{row.timePeriod}</TableCell> :
                    <TableCell align='left' >{row.timePeriod}</TableCell> }
                  <TableCell align='left'>{row.instructor}</TableCell>
                  <TableCell align='left'>{row.room}</TableCell>
                  <TableCell align='left'>{row.building}</TableCell>
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



