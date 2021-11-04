import { useState, useEffect } from 'react';

// Component: CourseList
// Description:
// 		A component that displays a list of courses
// 		and allows the user to select them.
// 		The list is filtered by the user's search term.

function CourseItem(props) {
    const {
        course,
        id
    } = props;

    // functions
    return (
        <div className="course-item">
            < input type = "checkbox" />
            <label>{course}</label>
        </div>
    );
}

export default CourseItem;