import CourseTable from "./CourseTable.js";

export default function CourseTableList({courseList}) {

    let items = [];

    return (
        <div>
            {courseList.map((item, index, arr) => {
                const prevItem = arr[index - 1];
                const isNewValue = prevItem ? item.value !== prevItem.value : true;
                const fullSection = `${item.value}-${item.section}`
    
                if((isNewValue && index > 0) || index == arr.length - 1){
                    console.log('index: ' + index + '   arr.length: ' + arr.length);
                    
                    if(index == 0){
                        items.push(item);   //only one item case     
                        let temp_items = [...items];
                        return <CourseTable key={fullSection} course={temp_items}/>;
                    }


    
                    // Last record and New record case
                    if (isNewValue > 0 && index == arr.length - 1) {    
                        let temp_items = [...items];
                        items=[item];   //only one item case 
                        return (
                            <>
                                <CourseTable key={fullSection} course={temp_items}/>
                                <CourseTable key={fullSection} course={items}/>
                            </>
                        );
                        // Nomal last record
                    } else {
                        let temp_items = [...items];                        
                        items=[item];   //only one item case     

                        return <CourseTable key={fullSection} course={temp_items}/>;
                    }


                } else {
                    items.push(item);
                }             
            })}
        </div>
    )
}