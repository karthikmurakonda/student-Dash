import React, { useState, useEffect } from 'react';
import { Alert, Form, Button, Container, Row, Col, FloatingLabel, Modal } from 'react-bootstrap'
import * as yup from 'yup'
import { Formik } from 'formik';
import ClassList from './ClassList/ClassList';
import AddClassForm from './ClassList/AddClassForm';
import axios from 'axios';

export default function CourseManage() {
    const [showModal, setShowModal] = useState(false)
    const [classes, setClasses] = useState([])
    const server = axios.create({
        baseURL: process.env.REACT_APP_SERVER_URL + '/courseplanner',
        withCredentials: true
    });

	let schema = yup.object().shape({
		name: yup.string().required('Required!'),
		code: yup.string().required('Required!'),
        credits: yup.number().positive('Must be a Positive Number!').required('Required!'),
        instructor: yup.string().required('Required!')
	})

	function login(values) {
        const newCourse = {
            course_name: values.name,
            course_code: values.code,
            course_credit: values.credits,
            course_timetable: classes,
            course_instructor: values.instructor
        }

        server.post("/", newCourse)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
	}

	return (
        <>
		<Container>
			<Row className="justify-content-center my-4">
				<Col lg="10">
					<h1 className="mx-5 my-4">Add a New Course</h1>
					<Formik validationSchema={schema} onSubmit={login} initialValues={{name: '', code: '', credits: '', instructor: ''}}>
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

                                <ClassList handleAdd={()=>setShowModal(true)} classes={classes} setClasses={setClasses} />

								<Button variant="primary" type="submit" disabled={!(isValid && dirty)}>
									Add New Course
								</Button>
							</Form>
						)}
					</Formik>
				</Col>
			</Row>
		</Container>
        <Modal size='lg' show={showModal} centered onHide={()=>setShowModal(false)} >
            <Modal.Header closeButton>
                <Modal.Title>Add a Class</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddClassForm classes={classes} setClasses={setClasses} setShowModal={setShowModal} />
            </Modal.Body>
        </Modal>
        </>
	)
}