import { useState, useEffect } from 'react';

// Component: CourseList
// Description:
// 		A component that displays a list of courses
// 		and allows the user to select them.
// 		The list is filtered by the user's search term.

function CourseItem({ course, id, disabled }) {

    // functions
    return (
        // <div className="course-item">
        //     < input type = "checkbox" />
        //     <label>{course}</label>
        // </div>
        <label class="list-group-item" >
            <input class="form-check-input me-1" type="checkbox" value="" disabled={disabled} />
            {course}
        </label>

    );
}

export default CourseItem;