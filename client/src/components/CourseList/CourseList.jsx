import { useState } from "react";
import CourseItem from "./CourseItem";
import { useCP } from "../../hooks/CPContext";

function CourseList() {
    const CP = useCP()
    function check() {
        console.log(CP.clashes)
    }
    
    return (
        <div className="list-group py-2">
            {   <button onClick={() => check()}>check</button> } 
            {CP.courses.map(course => (
                <CourseItem key={course.id} id ={course.id} course={course.course_name} disabled={false} />
            ))}
        </div>
    )
}

export default CourseList;
