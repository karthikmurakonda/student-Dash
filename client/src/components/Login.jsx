import React, { useRef, useState, useEffect } from 'react';
import { useAuth } from '../hooks/AuthContext';
import { Alert, Form, Button, Container, Row, Col } from 'react-bootstrap'
// import './custom.css'

export default function Login() {
	const idRef = useRef();
	const passRef = useRef();
	const auth = useAuth();

	const [validated, setValidated] = useState(false)
	const [showAlert, setShowAlert] = useState(false)

	useEffect(() => {
		if (auth.resp === 401) {
			setValidated(false)
			setShowAlert(true)
		}
	}, [auth.resp])

  	const handleSubmit = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}

		if (form.checkValidity() === true) {
			event.preventDefault();
			auth.login(idRef.current.value, passRef.current.value);
		}
		setValidated(true);
	};

	return (
		<Container>
			<Row className="justify-content-center my-4">
				<Col lg="5" md="9">
					<h1 className="mx-5 my-4">Login</h1>
					<Form className="mx-5 my-4" noValidate validated={validated} onSubmit={handleSubmit}>

						<MyAlert show={showAlert} setShow={setShowAlert} />

						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Username</Form.Label>
							<Form.Control ref={idRef} type="text" required/>
							<Form.Control.Feedback type="invalid">
								Please enter username.
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control ref={passRef} type="password" required/>
							<Form.Control.Feedback type="invalid">
								Please enter password.
							</Form.Control.Feedback>
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

function MyAlert({ show, setShow }) {
	const auth = useAuth()

	function onClose() {
		setShow(false)
		auth.setResp()
	}

	if (show) {
		return(
			<Alert variant="danger" onClose={onClose} dismissible>
				Incorrect username or password!
			</Alert>
		)
	}
	return(<></>)
}