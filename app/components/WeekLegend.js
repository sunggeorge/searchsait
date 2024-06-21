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

export default function WeekLegend({weekString, type}) { //Format: 1010101      
    
  let [mon, tue, wed, thu, fri, sat, sun] = weekString;

  // console.log(mon, tue, wed, thu, fri, sat, sun, type);
  
  let CSS1 = mon == 1 ? (type === 'CLAS' ? 'weekLegendClass' : 'weekLegendOther') : 'weekLegendOff';
  let CSS2 = tue == 1 ? (type === 'CLAS' ? 'weekLegendClass' : 'weekLegendOther') : 'weekLegendOff';
  let CSS3 = wed == 1 ? (type === 'CLAS' ? 'weekLegendClass' : 'weekLegendOther') : 'weekLegendOff';
  let CSS4 = thu == 1 ? (type === 'CLAS' ? 'weekLegendClass' : 'weekLegendOther') : 'weekLegendOff';
  let CSS5 = fri == 1 ? (type === 'CLAS' ? 'weekLegendClass' : 'weekLegendOther') : 'weekLegendOff';
  let CSS6 = sat == 1 ? (type === 'CLAS' ? 'weekLegendClass' : 'weekLegendOther') : 'weekLegendOff';
  let CSS7 = sun == 1 ? (type === 'CLAS' ? 'weekLegendClass' : 'weekLegendOther') : 'weekLegendOff';
  

    return (
    
          <table className="table-auto w-2/3 text-center">
          <tbody>
              <tr>
                <th className={CSS7}>S</th>
                <th className={CSS1}>M</th>
                <th className={CSS2}>T</th>
                <th className={CSS3}>W</th>
                <th className={CSS4}>T</th>
                <th className={CSS5}>F</th>
                <th className={CSS6}>S</th>
              </tr>
              </tbody>
          </table>

      );
}



