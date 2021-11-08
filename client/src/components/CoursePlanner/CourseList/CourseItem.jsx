import { useState, useEffect, useRef} from 'react';
import { useCP, server } from '../../../hooks/CPContext';
import { CloseButton, Collapse } from 'react-bootstrap';
const randomColor = require('randomcolor');

// Component: CourseList
// Description:
// 		A component that displays a list of courses
// 		and allows the user to select them.
// 		The list is filtered by the user's search term.

function CourseItem({ course, id, disabled }) {
    const inputRef = useRef()
    const CP = useCP()
    const [showInfo, setShowInfo] = useState(false)
    const [courseInfo, setCourseInfo] = useState({})

    useEffect(() => {
        server.get('/'+id)
            .then((res) => {
                setCourseInfo(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    function getNearestDate(day, time) {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const diff = day - dayOfWeek;
        if (diff >= 0) {
            return new Date(today.getFullYear(), today.getMonth(), today.getDate() + diff + 7, (time-(time%100))/100, time%100);
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
        courseInfo.course_timetable.map(myClass => {
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
                color: '#ffffff',
                rawStart: parseInt(myClass.start_time),
                rawEnd: parseInt(myClass.end_time),
                rawDay: parseInt(myClass.day),
                rawId: id
            }
            let schedules = CP.schedules
            schedules.push(newClass)
            CP.setSchedules([...schedules])
            CP.setTotalCredits(CP.totalCredits+courseInfo.course_credit)
        })
    }

    function removeCourse() {
        let calendars = CP.calendars
        // remove item from array when id matches
        calendars = calendars.filter(calendar => calendar.id !== id)
        CP.setCalendars(calendars);
        
        // remove each class from schedule
        let schedules = CP.schedules
        schedules = schedules.filter(schedule => schedule.calendarId !== id);
        // set new schedules and get clashes
        CP.setSchedules(schedules);
        CP.setTotalCredits(CP.totalCredits-courseInfo.course_credit)
    }

    function removeFromList() {
        let calendars = CP.calendars
        // remove item from array when id matches
        const currCal = calendars.filter(calendar => calendar.id === id)
        calendars = calendars.filter(calendar => calendar.id !== id)
        CP.setCalendars(calendars);
        // remove each class from schedule
        let schedules = CP.schedules
        schedules = schedules.filter(schedule => schedule.calendarId !== id);
        // set new schedules and get clashes
        CP.setSchedules(schedules);
        if(currCal.length > 0) {
            CP.setTotalCredits(CP.totalCredits-courseInfo.course_credit)
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
        CP.deselectCourse(id)
    }

    return (
        < >
        <label className="list-group-item" >
            <input ref={inputRef} onChange={handleSelect} className="form-check-input me-2" type="checkbox" value="" disabled={disabled} />
            {course}
            <a href="#" onClick={() => setShowInfo(!showInfo)} className="link-primary mx-1"><i className="bi bi-info-circle"></i></a>
            <CloseButton className="float-end" onClick={handleRemove} />
        </label>
        <Collapse in={showInfo}>
            <div className="list-group-item text-center">
                <table className="table table-striped my-1">
                    <tbody>
                        <tr>
                            <td>Credits:</td>
                            <td>{courseInfo.course_credit}</td>
                        </tr>
                        <tr>
                            <td>Mode:</td>
                            <td>{courseInfo.course_venue}</td>
                        </tr>
                        <tr>
                            <td>Instructor:</td>
                            <td>{courseInfo.course_instructor}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Collapse>
        </>
    );
}

export default CourseItem;
