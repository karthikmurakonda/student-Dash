import { useState, useEffect, useRef} from 'react';
import { useCP, server } from '../../hooks/CPContext';
const randomColor = require('randomcolor');

// Component: CourseList
// Description:
// 		A component that displays a list of courses
// 		and allows the user to select them.
// 		The list is filtered by the user's search term.

function CourseItem({ course, id, disabled }) {
    const inputRef = useRef()
    const CP = useCP()

    function getNearestDate(day, time) {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const diff = day - dayOfWeek;
        if (diff >= 0) {
            return new Date(today.getFullYear(), today.getMonth(), today.getDate() + diff, (time-(time%100))/100, time%100);
        } else if (diff < 0) {
            return new Date(today.getFullYear(), today.getMonth(), today.getDate() + diff + 7, (time-(time%100))/100, time%100);
        }
    }

    function addCourse() {
        // Add new calendar for the course
        var color = randomColor({ luminosity: 'dark', seed: id })
        const newCalendar = {
            id: String(id),
            name: course,
            bgColor: color,
            borderColor: color
        }
        let calendars = CP.calendars
        calendars.push(newCalendar)
        CP.setCalendars([...calendars])
        
        // Add each class to schedule
        let schedules = CP.schedules

        server.get('/'+id)
            .then((res) => {
                res.data.course_timetable.map(myClass => {
                    const newClass = {
                        id: String(CP.schedules.length+1),
                        calendarId: String(id),
                        title: course,
                        category: 'time',
                        dueDateClass: '',
                        start: getNearestDate(myClass.day, myClass.start_time).toISOString(),
                        end: getNearestDate(myClass.day, myClass.end_time).toISOString(),
                        bgColor: color,
                        borderColor: color,
                        color: '#ffffff'
                    }
                    console.log(getNearestDate(myClass.day, myClass.start_time).toTimeString());
                    let schedules = CP.schedules
                    schedules.push(newClass)
                    CP.setSchedules([...schedules])
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function removeCourse() {
        let calendars = CP.calendars
        // remove item from array when id matches
        calendars = calendars.filter(calendar => calendar.id !== id)
        CP.setCalendars(calendars);
        
        // remove each class from schedule
        let schedules = CP.schedules
        schedules = schedules.filter(schedule => schedule.calendarId !== id)
        CP.setSchedules(schedules);
    }

    function handleSelect() {
        const input = inputRef.current
        if (input.checked) {
            addCourse()
        }
        else {
            removeCourse()
        }
    }

    return (
        <label className="list-group-item" >
            <input ref={inputRef} onChange={handleSelect} className="form-check-input me-1" type="checkbox" value="" disabled={disabled} />
            {course}
        </label>

    );
}

export default CourseItem;