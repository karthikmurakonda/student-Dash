import React from 'react'
import { Col, Container, Row, CloseButton } from 'react-bootstrap'
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

export default function ListItem({myClass, classes, setClasses}) {

    function handleRemove() {
        var classeslocal = classes
        classeslocal = classeslocal.filter(checkClass => checkClass !== myClass)
        setClasses([...classeslocal])
    }

    return (
        <label className="list-group-item" >
            <Container fluid>
                <Row>
                    <Col>On {days[myClass.day]}</Col>
                    <Col>from {myClass.start_time}</Col>
                    <Col>to {myClass.end_time}</Col>
                    <CloseButton className="float-end" onClick={handleRemove} />
                </Row>
            </Container>
        </label>
    )
}
