import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './styles.css'

export default function Poster() {
    return (
        <Container fluid className="p-0 overflow-hidden text-center h-100">
            <img className="poster-img" src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80" alt="bg" />
            <div className="poster-text position-absolute top-50 start-50 translate-middle d-block">
                <Container fluid className="h-100">
                    <Row className="align-items-center h-100 justify-content-center">
                        <Col lg='3' md='5' sm="7" xs="9" className="align-self-center bg-overlay rounded p-0">
                            <div className="my-4 text-white">
                                <h1>Hey There!</h1>
                                <p>Welcome to Student Dash</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Container>
    )
}
