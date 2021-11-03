import React from 'react';
import { useAuth } from '../hooks/AuthContext'
import { Form, Button, Container, Row, Col, FloatingLabel } from 'react-bootstrap'
import * as yup from 'yup'
import { Formik } from 'formik'

export default function Signup() {
	const auth = useAuth();

	let schema = yup.object().shape({
		fname: yup.string().required('Required!'),
		lname: yup.string().required('Required!'),
		email: yup.string().email('Not a valid email!').required('Required!'),
		username: yup.string().required('Required!').test('username exists', 'Sorry this username is taken!', (value) => checkUsername(value)),
		password: yup.string().min(6, 'Password must have atleast 6 characters!').required('Required!'),
		confirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords do not match!').required('Required!')
	})

	function checkUsername(username) {
		return auth.usernameExists(username)
	}

	function makeUser(values) {
		auth.register(values.fname, values.lname, values.email, values.username, values.password);
	}

	return (
	<Container>
		<Row className="justify-content-center my-4">
			<Col lg="5" md="9">
				<h1 className="mx-5 my-4">Signup</h1>
				<Formik validationSchema={schema} onSubmit={makeUser} initialValues={{fname: '', lname: '', email: '', username: '', password: '', confirm: ''}}>
					{
						({handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, dirty}) => (
							<Form className="mx-5 my-4" noValidate onSubmit={handleSubmit}>
								<Form.Group className="mb-3">
									<Row>
										<Col>
											<FloatingLabel label="First Name">
												<Form.Control type="text" name="fname" value={values.fname} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.fname && errors.fname}></Form.Control>
												<Form.Control.Feedback type="invalid">{errors.fname}</Form.Control.Feedback>
											</FloatingLabel>
										</Col>
										<Col>
											<FloatingLabel label="Last Name">
												<Form.Control type="text" name="lname" value={values.lname} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.lname && !!errors.lname}></Form.Control>
												<Form.Control.Feedback type="invalid">{errors.lname}</Form.Control.Feedback>
											</FloatingLabel>
										</Col>
									</Row>
								</Form.Group>

								<Form.Group className="mb-3">
									<FloatingLabel label="Email">
										<Form.Control type="email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} isValid={touched.email && !errors.email} isInvalid={touched.email && errors.email}></Form.Control>
										<Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
									</FloatingLabel>
								</Form.Group>

								<Form.Group className="mb-3">
									<FloatingLabel label="Username">
										<Form.Control type="text" name="username" value={values.username} onChange={handleChange} onBlur={handleBlur} isValid={touched.username && !errors.username} isInvalid={touched.username && errors.username}/>
										<Form.Control.Feedback type="invalid">
											{errors.username}
										</Form.Control.Feedback>
									</FloatingLabel>
								</Form.Group>

								<Form.Group className="mb-3">
									<FloatingLabel label="Password">
										<Form.Control type="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} isValid={touched.password && !errors.password} isInvalid={touched.password && errors.password}/>
										<Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
									</FloatingLabel>
								</Form.Group>

								<Form.Group className="mb-3">
									<FloatingLabel label="Confirm Password">
										<Form.Control type="password" name="confirm" value={values.confirm} onChange={handleChange} onBlur={handleBlur} isValid={touched.confirm && !errors.confirm} isInvalid={touched.confirm && errors.confirm} />
										<Form.Control.Feedback type="invalid">{errors.confirm}</Form.Control.Feedback>
									</FloatingLabel>
								</Form.Group>

								<Button variant="primary" type="submit" disabled={!(isValid && dirty)}>
									Sign Up
								</Button>
							</Form>
						)
					}
					
				</Formik>
			</Col>
		</Row>
	</Container>
	)
}