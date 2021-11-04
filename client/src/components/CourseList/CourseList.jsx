import { useState } from "react";
import CourseItem from "./CourseItem";

function CourseList(props) {
    const courses = props.courses;

    
    return (
        <div>
            <ul>
                {courses.map(course => (
                    <CourseItem key={course.id} course={course.course} />
                ))}
            </ul>
        </div>
    )
}

export default CourseList;
