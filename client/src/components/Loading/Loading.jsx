import { Col, Container, Row, Spinner } from "react-bootstrap";
import './styles.css'

export default function Loading() {
    return (
        <Container className='h-100 greyed' fluid>
            <Row className='h-100 align-items-center justify-content-center'>
                <Col className="text-center">
                    <Spinner animation="border" />
                </Col>
            </Row>
        </Container>
    )
}
