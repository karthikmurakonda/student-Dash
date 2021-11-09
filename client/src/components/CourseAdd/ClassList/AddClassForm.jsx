import React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { Alert, Form, Button, Container, Row, Col, FloatingLabel, Modal } from 'react-bootstrap'

export default function AddClassForm({classes, setClasses, setShowModal}) {

    let schema = yup.object().shape({
		day: yup.number().required('Required!'),
		start: yup.number().required('Required!'),
        end: yup.number().required('Required!')
	})

	function handleAdd(values) {
        const newClass = {
            "day": String(values.day),
            "start_time": String(values.start),
            "end_time": String(values.end)
        }
        var classesLocal = classes
        classesLocal.push(newClass)
        setClasses([...classesLocal])
        setShowModal(false)
	}

    return (
        <Formik validationSchema={schema} onSubmit={handleAdd} initialValues={{day: '', start: '', end: ''}}>
            {({handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, dirty}) => (
                <Form className="mx-5 my-4" noValidate onSubmit={handleSubmit}>
                        
                    <Form.Group className="mb-3" controlId="formDay">
                        <FloatingLabel label="Day">
                            <Form.Select name="day" value={values.day} onChange={handleChange} onBlur={handleBlur} >
                                <option value="1">Monday</option>
                                <option value="2">Tuesday</option>
                                <option value="3">Wednesday</option>
                                <option value="4">Thursday</option>
                                <option value="5">Friday</option>
                                <option value="6">Saturday</option>
                                <option value="0">Sunday</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formStart">
                        <FloatingLabel label="Start Time">
                            <Form.Control type="number" name='start' value={values.start} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.start && errors.start} />
                            <Form.Control.Feedback type="invalid"> {errors.start} </Form.Control.Feedback>
                        </FloatingLabel>
                        <Form.Text className="text-muted"> Enter time in 24 hour format HHMM </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEnd">
                        <FloatingLabel label="Course End">
                            <Form.Control type="number" name='end' value={values.end} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.end && errors.end} />
                            <Form.Control.Feedback type="invalid"> {errors.end} </Form.Control.Feedback>
                        </FloatingLabel>
                        <Form.Text className="text-muted"> Enter time in 24 hour format HHMM </Form.Text>
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={!(isValid && dirty)}>
                        Add
                    </Button>
                </Form>
            )}
        </Formik>
    )
}
