import Timetable from "./Timetable";
import CourseList from "./CourseList";
import { Container, Row, Col, Collapse, Card, Modal, Alert, Badge } from 'react-bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Loading/Loading"
import { server, useCP } from "../../hooks/CPContext"
import ListCourses from "./AddCourse/ListCourses"
import Clashes from "./Clashes";

//render the component by function
export default function Courseplanner() {
    const CP = useCP()
    const [showCoursesi, setShowCoursesi] = useState(false)
    const [showCourseModal, setShowCourseModal] = useState(false)

    useEffect(() => {
        server.get("/", { params: { page: 1 } })
            .then((res) => {
                CP.setCourses(res.data.results)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        CP.getClashes()
    }, [CP.schedules])

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
            < >
            <Container className='mt-3' fluid>
                <Row>
                    <Col lg='10'>
                        <Timetable />
                    </Col>
                    <Col lg='2' className='px-3'>
                        {CP.totalCredits? (
                            <Card className='my-2'>
                                <Card.Body className='p-2 text-center'>Current Credits: <Badge className='mx-1' bg="dark">{CP.totalCredits}</Badge></Card.Body>
                            </Card>
                        ):<></>}
                        <h3>Courses <a href="#" onClick={() => setShowCoursesi(!showCoursesi)} className="link-primary h5"><i className="bi bi-info-circle"></i></a></h3>
                        <Collapse in={showCoursesi}>
                            <Card>
                                <Card.Body>
                                    Add courses you wish to take to this list and see how your schedule work out!
                                </Card.Body>
                            </Card>
                        </Collapse>
                        <CourseList handleAdd={()=>setShowCourseModal(true)} />
                        <Clashes />
                    </Col>
                </Row>
            </Container>
            <Modal show={showCourseModal} centered onHide={()=>setShowCourseModal(false)} >
                <Modal.Header closeButton>
                    <Modal.Title>Add a Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListCourses />
                </Modal.Body>
            </Modal>
            </>
        );
    }
    else {
        return (<Loading />)
    }
}

