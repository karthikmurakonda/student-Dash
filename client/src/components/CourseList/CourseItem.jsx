import { useState, useEffect, useRef} from 'react';
import { useCP, server } from '../../hooks/CPContext';

// Component: CourseList
// Description:
// 		A component that displays a list of courses
// 		and allows the user to select them.
// 		The list is filtered by the user's search term.

function CourseItem({ course, id, disabled }) {
    const inputRef = useRef()
    const CP = useCP()

    async function addCourse() {
        // Add new calendar for the course
        const newCalendar = {
            id: id,
            name: course
        }
        let calendars = CP.calendars
        calendars.push(newCalendar)
        CP.setCalendars(calendars)
        
    }

    function removeCourse() {
        let calendars = CP.calendars
        // remove item from array when id matches
        calendars = calendars.filter(calendar => calendar.id !== id)
        CP.setCalendars(calendars);
        

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