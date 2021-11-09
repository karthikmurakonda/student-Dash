import React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useAuth } from '../../hooks/AuthContext'

const server = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL + '/post',
    withCredentials: true
})

export default function PostForm({setShowModal, update, setUpdate}) {
    const auth = useAuth()

    let schema = yup.object().shape({
		content: yup.string().required('Required!')
	})

	function handleCreate(values) {
        const newPost = {
            content: values.content,
            author: auth.user.username
        }
        server.post('/', newPost)
            .then((res) => {
                setShowModal(false)
                setUpdate(!update)
            })
	}

    return (
        <Formik validationSchema={schema} onSubmit={handleCreate} initialValues={{content: ""}}>
            {({handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, dirty}) => (
                <Form className="mx-5 my-4" noValidate onSubmit={handleSubmit}>

                    <Form.Group className="mb-3" controlId="formContent">
                        <Form.Control as="textarea" rows="10" name='content' value={values.content} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.content && errors.content} />
                        <Form.Control.Feedback type="invalid"> {errors.content} </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={!(isValid && dirty)}>
                        Create
                    </Button>
                </Form>
            )}
        </Formik>
    )
}
