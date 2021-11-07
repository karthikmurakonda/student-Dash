import Timetable from "./Timetable";
import CourseList from "./CourseList";
import { Container, Row, Col, Collapse, Card } from 'react-bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Loading/Loading"
import { server, useCP } from "../../hooks/CPContext"

//render the component by function
export default function Courseplanner() {
    const CP = useCP()
    const [showCoursesi, setShowCoursesi] = useState(false)
    useEffect(() => {
        server.get("/", { params: { page: 1 } })
            .then((res) => {
                console.log(res.data)
                CP.setCourses(res.data.results)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    // dummy props
    // const courses = [
    //     {
    //         id: 1,
    //         course: "React",
    //     },
    //     {
    //         id: 2,
    //         course: "Redux",
    //     },
    //     {
    //         id: 3,
    //         course: "Node",
    //     },
    // ];

    if (CP.courses) {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <h1>Courseplanner</h1>
                    </Col>
                </Row>
                <Row>
                    <Col lg='10'>
                        <Timetable />
                    </Col>
                    <Col lg='2' className='px-3'>
                        <h3>Courses <a href="#" onClick={() => setShowCoursesi(!showCoursesi)} className="link-primary h5"><i className="bi bi-info-circle"></i></a></h3>
                        <Collapse in={showCoursesi}>
                            <Card>
                                <Card.Body>
                                    Select the courses you wish to take! Clashing or uneligible courses will be disabled.
                                </Card.Body>
                            </Card>
                        </Collapse>
                        <CourseList />
                    </Col>
                </Row>
            </Container>
        );
    }
    else {
        return (<Loading />)
    }
}

