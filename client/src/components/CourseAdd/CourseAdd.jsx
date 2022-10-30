import React, { useEffect, useState } from 'react';
import { Alert, Form, Button, Container, Row, Col, FloatingLabel, Modal } from 'react-bootstrap'
import * as yup from 'yup'
import { Formik } from 'formik';
import ClassList from '../SlotAdd/ClassList/ClassList';
import AddClassForm from '../SlotAdd/ClassList/AddClassForm';
import axios from 'axios';

export default function CourseManage() {
    const [showModal, setShowModal] = useState(false)
    const [slots, setSlots] = useState([])
    const [success, setSuccess] = useState(false)
    const [failure, setFailure] = useState(false)
    const server = axios.create({
        baseURL: process.env.REACT_APP_SERVER_URL + '/',
        withCredentials: true
    });

	useEffect(() => {
		server.get("slot/ids")
			.then((res) => {
				setSlots(res.data)
				console.log(res.data);
			})
			.catch((err) => {
				setFailure(true)
				console.log(err);
			})
	}, [])

	let schema = yup.object().shape({
		name: yup.string().required('Required!'),
		code: yup.string().required('Required!'),
        credits: yup.number().positive('Must be a Positive Number!').required('Required!'),
        instructor: yup.string().required('Required!'),
		slot: yup.string().required('Required!'),
		capacity: yup.number().positive('Must be a Positive Number!')
	})

	function login(values, {resetForm}) {
        const newCourse = {
            name: values.name,
            code: values.code,
            credits: values.credits,
            instructor: values.instructor,
            time_slot: values.slot,
        }

		if (values.capacity) {
			newCourse.capacity = values.capacity
		}
		if (values.venue) {
			newCourse.venue = values.venue
		}

        server.post("course/", newCourse)
            .then((res) => {
                setSuccess(true)
                resetForm()
            })
            .catch((err) => {
                setFailure(true)
            })
	}

	return (
        <>
		<Container>
			<Row className="justify-content-center my-4">
				<Col lg="10">
                    <Alert variant="danger mx-5" show={failure} onClose={() => setFailure(false)} dismissible>Something went wrong!</Alert>
                    <Alert variant="success mx-5" show={success} onClose={() => setSuccess(false)} dismissible>Course added successfully!</Alert>
					<h1 className="mx-5 my-4">Add a New Course</h1>
					<Formik validationSchema={schema} onSubmit={login} initialValues={{name: '', code: '', credits: '', instructor: '', slot: ''}}>
						{({handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, dirty}) => (
							<Form className="mx-5 my-4" noValidate onSubmit={handleSubmit}>

                                <Form.Group className="mb-3" controlId="formName">
                                    <FloatingLabel label="Course Name">
                                        <Form.Control type="text" name='name' value={values.name} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.name && errors.name} />
                                        <Form.Control.Feedback type="invalid"> {errors.name} </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                                    
                                <Form.Group className="mb-3" controlId="formCode">
                                    <FloatingLabel label="Course Code">
                                        <Form.Control type="text" name='code' value={values.code} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.code && errors.code} />
                                        <Form.Control.Feedback type="invalid"> {errors.code} </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formCredits">
                                    <FloatingLabel label="Course Credits">
                                        <Form.Control type="number" name='credits' value={values.credits} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.credits && errors.credits} />
                                        <Form.Control.Feedback type="invalid"> {errors.credits} </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formInstructor">
                                    <FloatingLabel label="Course Instructor">
                                        <Form.Control type="text" name='instructor' value={values.instructor} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.instructor && errors.instructor} />
                                        <Form.Control.Feedback type="invalid"> {errors.instructor} </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>

								<Form.Group className="mb-3" controlId="formVenue">
                                    <FloatingLabel label="Course Venue">
                                        <Form.Control type="text" name='venue' value={values.venue} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.venue && errors.venue} />
                                        <Form.Control.Feedback type="invalid"> {errors.venue} </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>

								<Form.Group className="mb-3" controlId="formCapacity">
									<FloatingLabel label="Course Capacity">
										<Form.Control type="number" name='capacity' value={values.capacity} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.capacity && errors.capacity} />
										<Form.Control.Feedback type="invalid"> {errors.capacity} </Form.Control.Feedback>
									</FloatingLabel>
								</Form.Group>

								<Form.Group className="mb-3" controlId="formSlot">
									<FloatingLabel label="Slot">
										<Form.Select name="slot" value={values.slot} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.slot && errors.slot}>
											<option value=""></option>
											{slots.map((slot) => (
												<option value={slot}>{slot}</option>
											))}
										</Form.Select>
										<Form.Control.Feedback type="invalid"> {errors.slot} </Form.Control.Feedback>
									</FloatingLabel>
								</Form.Group>

								<Button variant="primary" type="submit" disabled={!(isValid && dirty)}>
									Add New Course
								</Button>
							</Form>
						)}
					</Formik>
				</Col>
			</Row>
		</Container>
        </>
	)
}