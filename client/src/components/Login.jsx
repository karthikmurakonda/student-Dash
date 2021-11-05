import React, { useState } from 'react';
import { useAuth } from '../hooks/AuthContext';
import { Alert, Form, Button, Container, Row, Col, FloatingLabel } from 'react-bootstrap'
import * as yup from 'yup'
import { Formik } from 'formik';

export default function Login() {
	const auth = useAuth();
	const [showAlert, setShowAlert] = useState(false)

	let schema = yup.object().shape({
		username: yup.string().required('Please enter username!'),
		password: yup.string().required('Please enter password!')
	})

	function login(values) {
		auth.login(values.username, values.password, setShowAlert)
	}

	return (
		<Container>
			<Row className="justify-content-center my-4">
				<Col lg="5" md="9">
					<h1 className="mx-5 my-4">Login</h1>
					<Formik validationSchema={schema} onSubmit={login} initialValues={{username: '', password: ''}}>
						{({handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, dirty}) => (
							<Form className="mx-5 my-4" noValidate onSubmit={handleSubmit}>
								<Alert variant="danger" show={showAlert} onClose={() => setShowAlert(false)} dismissible>Incorrect username or password!</Alert>

								<Form.Group className="mb-3" controlId="formBasicEmail">
									<FloatingLabel label="Username">
										<Form.Control type="text" name='username' value={values.username} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.username && errors.username} />
										<Form.Control.Feedback type="invalid"> {errors.username} </Form.Control.Feedback>
									</FloatingLabel>
								</Form.Group>
								
								<Form.Group className="mb-3" controlId="formBasicPassword">
									<FloatingLabel label="Password">
										<Form.Control type="password" name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.password && errors.password} />
										<Form.Control.Feedback type="invalid"> {errors.password} </Form.Control.Feedback>
									</FloatingLabel>
								</Form.Group>

								<Button variant="primary" type="submit" disabled={!(isValid && dirty)}>
									Login
								</Button>
							</Form>
						)}
					</Formik>
				</Col>
			</Row>
		</Container>
	)
}