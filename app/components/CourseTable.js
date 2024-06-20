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

export default function CourseTable({course}) {      
    
    let rows = [];

    function createData(section, type, startTime, endTime, room, building, startDate, endDate,
        mon, tue, wed, thu, fri, sat, sun
    ) {
        let datePeriod = `${startDate} - ${endDate}`;
        let weekDay = renderWeekDay(mon, tue, wed, thu, fri, sat, sun);
        let timePeriod = `${weekDay && startTime ? weekDay + ' : ' + startTime + ' - ' + endTime: ''}`;        
        return { section, type, timePeriod, room, building, datePeriod};
      }
    // console.log(course);



    course.map((classes) => {
        classes.class.map((section, index) => {
            rows.push(createData(
                index==0?`${classes.value}-${classes.section}`:'', 
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
                section.sun
            ));
            // console.log(item);
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
                <TableCell align="left">Room</TableCell>
                <TableCell align="left">Building</TableCell>
                <TableCell align="left">Date</TableCell>
                                
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.section}
                  

                //   sx={row.section === '' 
                //     ? { '&:last-child td, &:last-child th': { border: 0 } } 
                //     : { '&:last-child td, &:last-child th': { border: 0 }, 'td, th': { borderTop: '0px solid black' } }
                // }


                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" className='text-blue-700'>{row.section}</TableCell>
                  {/* <TableCell align='right'>{renderMeetingTypeIcon(row.type)}</TableCell> */}
                  <TableCell align='left'>{row.timePeriod}</TableCell>
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



