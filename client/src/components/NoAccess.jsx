import { Col, Container, Row, Alert } from "react-bootstrap";

export default function Loading() {
    return (
        <Container className='h-100' fluid>
            <Row className='h-100 align-items-center justify-content-center'>
                <Col sm='3' className="text-center">
                    <Alert variant="danger">You do not have access to this page!</Alert>
                </Col>
            </Row>
        </Container>
    )
}
