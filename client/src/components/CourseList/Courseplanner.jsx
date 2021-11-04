import Timetable from "./Calendar";
import CourseList from "./CourseList";
import "./style.css";

//render the component by function
export default function Courseplanner() {

    // dummy props
    const courses = [
        {
            id: 1,
            course: "React",
        },
        {
            id: 2,
            course: "Redux",
        },
        {
            id: 3,
            course: "Node",
        },
    ];

    return (
        <div className="courseplanner">
        <div className="courseplanner-header">
            <h1>Courseplanner</h1>
        </div>
        <div className="timetable-wrapper">
        <Timetable />

        </div>
        <div className="courseplanner-body">
            <CourseList
                courses={courses}
             />
        </div>
        </div>
    );
}

