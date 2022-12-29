import { useState, useEffect, useRef} from 'react';
import { useCP, server } from '../../../hooks/CPContext';
import { CloseButton, Collapse } from 'react-bootstrap';
const randomColor = require('randomcolor');

// Component: CourseList
// Description:
// 		A component that displays a list of courses
// 		and allows the user to select them.
// 		The list is filtered by the user's search term.

function CourseItem({ course, name, code, disabled }) {
    const inputRef = useRef()
    const CP = useCP()
    const [showInfo, setShowInfo] = useState(false)

    function getNearestDate(day, time) {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const diff = day - dayOfWeek;
		return new Date(today.getFullYear(), today.getMonth(), today.getDate() + diff + 7, time.split(":")[0], time.split(":")[1]);
    }

    function addCourse() {
        // Add new calendar for the course
        var color = randomColor({ luminosity: 'dark', seed: code })
        const newCalendar = {
            code: String(code),
            name: name,
            bgColor: color,
            borderColor: color
        }
        let calendars = CP.calendars
        calendars.push(newCalendar)
        CP.setCalendars([...calendars])
        // Add each class to schedule
        course.time_slot.map(myClass => {
            const newClass = {
                code: String(CP.schedules.length+1),
                calendarcode: String(code),
                title: name,
                category: 'time',
                dueDateClass: '',
                start: getNearestDate(myClass.day, myClass.start_time).toISOString(),
                end: getNearestDate(myClass.day, myClass.end_time).toISOString(),
                bgColor: color,
                borderColor: color,
                color: '#ffffff',
                rawStart: parseInt(myClass.start_time.split(":")[0]+myClass.start_time.split(":")[1]),
                rawEnd: parseInt(myClass.end_time.split(":")[0]+myClass.end_time.split(":")[1]),
                rawDay: parseInt(myClass.day),
                rawcode: code
            }
            let schedules = CP.schedules
            schedules.push(newClass)
            CP.setSchedules([...schedules])
            CP.setTotalCredits(CP.totalCredits+course.credits)
        })
    }

    function removeCourse() {
        let calendars = CP.calendars
        // remove item from array when code matches
        calendars = calendars.filter(calendar => calendar.code !== code)
        CP.setCalendars(calendars);
        
        // remove each class from schedule
        let schedules = CP.schedules
        schedules = schedules.filter(schedule => schedule.calendarcode !== code);
        // set new schedules and get clashes
        CP.setSchedules(schedules);
        CP.setTotalCredits(CP.totalCredits-course.credits)
    }

    function removeFromList() {
        let calendars = CP.calendars
        // remove item from array when code matches
        const currCal = calendars.filter(calendar => calendar.code === code)
        calendars = calendars.filter(calendar => calendar.code !== code)
        CP.setCalendars(calendars);
        // remove each class from schedule
        let schedules = CP.schedules
        schedules = schedules.filter(schedule => schedule.calendarcode !== code);
        // set new schedules and get clashes
        CP.setSchedules(schedules);
        if(currCal.length > 0) {
            CP.setTotalCredits(CP.totalCredits-course.credits)
        }
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

    function handleRemove() {
        removeFromList()
        CP.deselectCourse(code)
    }

    return (
        < >
        <label className="list-group-item" >
            <input ref={inputRef} onChange={handleSelect} className="form-check-input me-2" type="checkbox" value="" disabled={disabled} />
            {name}
            <a href="#" onClick={() => setShowInfo(!showInfo)} className="link-primary mx-1"><i className="bi bi-info-circle"></i></a>
            <CloseButton className="float-end" onClick={handleRemove} />
        </label>
        <Collapse in={showInfo}>
            <div className="list-group-item text-center">
                <table className="table table-striped my-1">
                    <tbody>
                        <tr>
                            <td>Credits:</td>
                            <td>{course.credits}</td>
                        </tr>
                        <tr>
                            <td>Venue:</td>
                            <td>{course.venue}</td>
                        </tr>
                        <tr>
                            <td>Instructor:</td>
                            <td>{course.instructor}</td>
                        </tr>
						<tr>
                            <td>Capacity:</td>
                            <td>{course.capacity}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Collapse>
        </>
    );
}

export default CourseItem;
