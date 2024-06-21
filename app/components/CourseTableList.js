'use client'
import { useEffect, useState } from 'react';
import CourseTable from "./CourseTable.js";



export default function CourseTableList({courseList, insList}) {

    const [displayElements, setDisplayElements] = useState([]);

    useEffect(() => {

        let items = [];
        let elements = [];

        console.log('CourseTableList:')
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
                elements.push(<CourseTable key={key} course={temp_items} insList={insList}/>);
                // elements.push(<CourseTable  course={temp_items} insList={insList}/>);
                items = [item];
            } else {
                items.push(item);
            }

            // Handle the last item
            if(index === arr.length - 1){
                let temp_items = [...items];
                key = item.crn;
                elements.push(<CourseTable key={key} course={temp_items} insList={insList}/>);
            }
        });
        setDisplayElements(elements);


    }, [courseList, insList]);

    console.log('Display Elements:');
    console.log(displayElements);

    return (
        <div>
            {displayElements}
        </div>
    )
}