import CourseItem from "./CourseItem";
import { useCP } from "../../../hooks/CPContext";

function CourseList({ handleAdd }) {
    const CP = useCP()
    // function check() {
    //     console.log(CP.schedules)
    // }
    
    return (
        <div className="list-group py-2">
            {/* <button onClick={() => check()}>check</button> */}
            {CP.selectedCourses.map(course => (
                <CourseItem key={course.code} code={course.code} course={course} name={course.name} disabled={false} />
            ))}
            <div className="list-group-item text-center">
                <button onClick={handleAdd} type="button" className="btn btn-primary">Add <i className="bi bi-plus-lg"></i></button>
            </div>
        </div>
    )
}

export default CourseList;
