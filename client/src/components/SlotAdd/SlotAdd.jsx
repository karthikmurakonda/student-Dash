import React, { useState } from 'react';
import { Alert, Form, Button, Container, Row, Col, FloatingLabel, Modal } from 'react-bootstrap'
import * as yup from 'yup'
import { Formik } from 'formik';
import ClassList from '../SlotAdd/ClassList/ClassList';
import AddClassForm from '../SlotAdd/ClassList/AddClassForm';
import axios from 'axios';

export default function CourseManage() {
    const [showModal, setShowModal] = useState(false)
    const [classes, setClasses] = useState([])
    const [success, setSuccess] = useState(false)
    const [failure, setFailure] = useState(false)
    const server = axios.create({
        baseURL: process.env.REACT_APP_SERVER_URL + '/slot',
        withCredentials: true
    });

	let schema = yup.object().shape({
		id: yup.string().required('Required!')
	})

	function submit(values, {resetForm}) {
        const newCourse = {
            id: values.id,
            classes: classes
        }

        server.post("/", newCourse)
            .then((res) => {
                setSuccess(true)
                resetForm()
                setClasses([])
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
                    <Alert variant="success mx-5" show={success} onClose={() => setSuccess(false)} dismissible>Slot added successfully!</Alert>
					<h1 className="mx-5 my-4">Add a New Time Slot</h1>
					<Formik validationSchema={schema} onSubmit={submit} initialValues={{id: ''}}>
						{({handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, dirty}) => (
							<Form className="mx-5 my-4" noValidate onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formID">
                                    <FloatingLabel label="Slot ID">
                                        <Form.Control type="text" name='id' value={values.id} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.id && errors.id} />
                                        <Form.Control.Feedback type="invalid"> {errors.id} </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>

                                <ClassList handleAdd={()=>setShowModal(true)} classes={classes} setClasses={setClasses} />

								<Button variant="primary" type="submit" disabled={!(isValid && dirty)}>
									Add New Slot
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