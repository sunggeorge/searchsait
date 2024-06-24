'use client'
import { useEffect, useState } from 'react';
import CourseTable from "./CourseTable.js";
import ProcessCombination from './ProcessCombination.js';



export default function CourseTableList({courseList, insList}) {

    const [displayElements, setDisplayElements] = useState([]);
    const [combination, setCombination] = useState([]);

    useEffect(() => {

        let items = [];
        let elements = [];

        setCombination([]);

        console.log('CourseTableList in next page:')
        console.log(courseList);
        // console.log('Instructor list:');  
        // console.log(insList);  

        courseList.forEach((item, index, arr) => {
            const prevItem = arr[index - 1];
            const isNewValue = prevItem ? item.value !== prevItem.value : true;
            // const fullSection = `${item.value}-${item.section}`
            let key;   

            if(isNewValue && index > 0){
                let temp_items = [...items];
                key = prevItem.crn;
                // elements.push(<CourseTable key={key} course={temp_items} insList={insList} appendCombination={(prev, list)=>setCombination([...prev,list])}/>);
                elements.push(<CourseTable key={key} course={temp_items} insList={insList} appendCombination={(list)=>setCombination(prev=>[...prev, list])}/>);
                // elements.push(<CourseTable  course={temp_items} insList={insList}/>);
                items = [item];
            } else {
                items.push(item);
            }

            // Handle the last item
            if(index === arr.length - 1){
                let temp_items = [...items];
                key = item.crn;
                elements.push(<CourseTable key={key} course={temp_items} insList={insList} appendCombination={(list)=>setCombination(prev=>[...prev, list])}/>);
            }
        });
        setDisplayElements(elements);

    }, [courseList, insList]);




    useEffect(() => {




        console.log('Combination Elements change:');
        console.log(combination);
    }, [combination]);

    // console.log('Display Elements:');
    // console.log(displayElements);
    // console.log('Combination Elements:');
    // console.log(combination);    

    return (
        <div>
            <div>
                <ProcessCombination selCombo={[...combination]}/>
            </div>
            <div>
                {displayElements}
            </div>
        </div>
    )
}