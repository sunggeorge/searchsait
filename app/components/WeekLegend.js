import * as React from 'react';

export default function WeekLegend({weekString, type}) {       
    
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



