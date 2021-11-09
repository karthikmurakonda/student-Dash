import { useState, useEffect, useRef} from 'react';
import { useCP } from '../../../hooks/CPContext';

// Component: CourseList
// Description:
// 		A component that displays a list of courses
// 		and allows the user to select them.
// 		The list is filtered by the user's search term.

export default function SearchItem({ course, id, disabled }) {
    const inputRef = useRef()
    const CP = useCP()
    const [selected, setSelected] = useState(false)
    const [init, setInit] = useState(false)

    useEffect(() => {
        let selectedCourses = CP.selectedCourses
        selectedCourses = selectedCourses.filter(course => course.id === id)
        if (selectedCourses.length) {
            setSelected(true)
            setInit(true)
        }
        else {
            setSelected(false)
            setInit(false)
        }
    }, [])

    function addCourse() {
        let selectedCourses = CP.selectedCourses
        selectedCourses.push(course)
        CP.setSelectedCourses([...selectedCourses])
        setSelected(true)
    }

    function removeCourse() {
        CP.deselectCourse(id)
        setSelected(false)
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

    if (!init) {
        return (
            <label className="list-group-item" >
                <input ref={inputRef} onChange={handleSelect} className="form-check-input me-2" type="checkbox" value="" disabled={disabled} checked={selected} />
                {course.course_code}: {course.course_name}
            </label>
        )
    }
    else {
        return (< ></>)
    }
}