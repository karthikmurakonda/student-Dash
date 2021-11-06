import { useState } from "react";
import CourseItem from "./CourseItem";

function CourseList({ courses }) {
    
    return (
        // <div>
        //     <ul>
        //         {courses.map(course => (
        //             <CourseItem key={course.id} course={course.course} />
        //         ))}
        //     </ul>
        // </div>
        <div className="list-group py-2">
            {courses.map(course => (
                <CourseItem key={course.id} course={course.course} disabled={false} />
            ))}
        </div>
    )
}

export default CourseList;
