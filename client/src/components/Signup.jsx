import React, { useRef } from 'react';
import { useAuth } from '../hooks/AuthContext'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'

export default function Signup() {
	const idRef = useRef();
	const passRef = useRef();
	const auth = useAuth();

	function handleSubmit(e) {
		e.preventDefault();
		auth.register(idRef.current.value, passRef.current.value);
	}

	return (
	<Container>
		<Row className="justify-content-center my-4">
			<Col lg="5" md="9">
				<h1 className="mx-5 my-4">Signup</h1>
				<Form className="mx-5 my-4" onSubmit={handleSubmit}>
					<Form.Group className="mb-3">
						<Row>
							<Col><Form.Control type="text" placeholder="First name"></Form.Control></Col>
							<Col><Form.Control type="text" placeholder="Last name"></Form.Control></Col>
						</Row>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Control type="email" placeholder="Institute Email"></Form.Control>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Control ref={idRef} type="text" placeholder="Username" required/>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Control ref={passRef} type="password" placeholder="Password" required/>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Control ref={passRef} type="password" placeholder="Confirm Password" required/>
					</Form.Group>

					<Button variant="primary" type="submit">
						Sign Up
					</Button>
				</Form>
			</Col>
		</Row>
	</Container>
	)
}