import { useRef, useEffect } from "react";
import { useCP, server } from "../../../hooks/CPContext";
import SearchItem from "./SearchItem"
import { FloatingLabel, Form } from "react-bootstrap";

function CourseList() {
    const CP = useCP()
    const searchRef = useRef()

    useEffect(() => {
        search()
    }, [])

    function search() {
        if (searchRef.current.value === '') {
            server.get("/course/", { params: { page: 1 } })
                .then((res) => {
                    CP.setCourses(res.data)
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        else {
            server.get("/course/", { params: { page: 1, search: searchRef.current.value } })
                .then((res) => {
                    console.log(res.data)
                    CP.setCourses(res.data)
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }
    
    return (
        < >
        <FloatingLabel label="Search" >
            <Form.Control ref={searchRef} type="text" onChange={search} />
            <Form.Text className="text-muted"> Search for a course by name or code. </Form.Text>
        </FloatingLabel>
        <div className="list-group py-2">
            {CP.courses.map(course => (
                <SearchItem key={course.code} code={course.code} course={course} disabled={false} />
            ))}
        </div>
        </>
    )
}

export default CourseList;
