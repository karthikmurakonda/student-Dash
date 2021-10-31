import React, { useRef } from 'react';
import { useAuth } from '../hooks/AuthContext';
import { Form, Button, Container, Row, Col } from 'react-bootstrap'

export default function Login() {
	const idRef = useRef();
	const passRef = useRef();
	const auth = useAuth();

	function handleSubmit(e) {
		e.preventDefault();
		auth.login(idRef.current.value, passRef.current.value);
	}

	return (
		<Container>
			<Row className="justify-content-center my-4">
				<Col lg="5" md="9">
					<h1 className="mx-5 my-4">Login</h1>
					<Form className="mx-5 my-4" onSubmit={handleSubmit}>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Control ref={idRef} type="text" placeholder="Username" required/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Control ref={passRef} type="password" placeholder="Password" required/>
						</Form.Group>

						<Button variant="primary" type="submit">
							Login
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	)
}