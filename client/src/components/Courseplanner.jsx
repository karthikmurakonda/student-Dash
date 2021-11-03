import CourseItem from "./CourseList/CouseItem";

// import calender

//render the component by function
export default function Courseplanner() {
    return (
        <div className="courseplanner">
        <div className="courseplanner-header">
            <h1>Courseplanner</h1>
        </div>
        <div className="courseplanner-body">
            <CourseItem 
            coursename = 'hello'
             />
        </div>
        </div>
    );
}

