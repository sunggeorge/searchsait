// 'use client'
// import React, { useRef, useEffect } from 'react';
// import Calendar from '@toast-ui/react-calendar';
// import '@toast-ui/calendar/dist/toastui-calendar.min.css';


// // export default function YourComponent() {
// export default function Page() {


//     const calendars = [{ id: 'cal1', name: 'Personal' }];
//     const initialEvents = [
//       {
//         id: '1',
//         calendarId: 'cal1',
//         title: 'Lunch',
//         category: 'time',
//         start: '2022-06-28T12:00:00',
//         end: '2022-06-28T13:30:00',
//       },
//       {
//         id: '2',
//         calendarId: 'cal1',
//         title: 'Coffee Break',
//         category: 'time',
//         start: '2022-06-28T15:00:00',
//         end: '2022-06-28T15:30:00',
//       },
//     ];
    
//     const onAfterRenderEvent = (event) => {
//         console.log(event.title);
//       };

//     const calendarRef = React.createRef();

//     // Custom template function for week header
//     const customWeekHeaderTemplate = (model) => {
//         // model.date, model.dayName are available
//         // Customize your header content here. This is a simple example.
//         return `<span class="toastui-calendar-day-name__date">${model.dayName}</span>`;
//         // <span class="toastui-calendar-day-name__name">${model.date}</span>`;

//     };

//     useEffect(() => {
//         if (calendarRef.current) {
//             const Ins = calendarRef.current.getInstance();
//             Ins.setDate('2022-06-28');
//             // Ins.createEvents(initialEvents);
//             Ins.setOptions({
//               contentHeight : 1000
//             });

//         }
//     }, []);

//     return(
//         <div className='w-3/5'>
//         <Calendar
//           // height="900px"
//           contentHeight = "500"
//           view="week"
//           rowHeight="100px"
//           usageStatistics={false}
//           isReadOnly={true}
//           week={{
//             dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
//             hourStart: 8,
//             hourEnd: 21,
//             eventView: ['time'],
//             taskView: false
//             // type EventView = 'allday' | 'time';
//             // type TaskView = 'milestone' | 'task';
//             // visibleWeeksCount: 3,
//           }}
//           calendars={calendars}
//           events={initialEvents}
//           onAfterRenderEvent={onAfterRenderEvent}
//           ref={calendarRef} 
//           template={{
//             // Apply the custom template function for week day names
//             weekDayName: customWeekHeaderTemplate
//         }}          
//         />
//       </div>
//     );
//   }