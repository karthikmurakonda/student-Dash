import Timetable from "./Calendar";
import CourseList from "./CourseList";
import "./style.css";
import { Container, Row, Col, Collapse, Card } from 'react-bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useState } from "react";

//render the component by function
export default function Courseplanner() {
    const [showCoursesi, setShowCoursesi] = useState(false)

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
                    <h3>Courses <a href="javascript:void(0)" onClick={() => setShowCoursesi(!showCoursesi)} class="link-primary h5"><i class="bi bi-info-circle"></i></a></h3>
                    <Collapse in={showCoursesi}>
                        <Card>
                            <Card.Body>
                                Select the courses you wish to take! Clashing or uneligible courses will be disabled.
                            </Card.Body>
                        </Card>
                    </Collapse>
                    <CourseList courses={courses} />
                </Col>
            </Row>
        </Container>
    );
}

