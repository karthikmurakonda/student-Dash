import React, { useState, useEffect} from 'react'
import { Alert, Col, Container, Row, Button, Modal, Pagination } from 'react-bootstrap'
import axios from 'axios'
import Post from './Post'
import Loading from '../Loading/Loading'
import PostForm from './PostForm'

const server = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL + '/post',
    withCredentials: true
})

export default function Posts() {
    const [posts, setPosts] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [update, setUpdate] = useState(false)
    const [items, setItems] = useState([])
    const [pages, setPages] = useState(1)
    const [page, setPage] = useState(1)

    useEffect(() => {
        server.get("/", { params: { page: page } })
            .then((res) => {
                setPosts(res.data.results)
                setLoaded(true)
                setPage(res.data.page)
                setPages(res.data.totalPages)
            })
            .catch((err) => {
                console.log(err)
                setLoaded(true)
            })
    }, [update, page])

    useEffect(() => {
        let items = [];
        for (let number = 1; number <= pages; number++) {
            items.push(
                <Pagination.Item key={number} active={number === page} onClick={()=>setPage(number)}>
                {number}
                </Pagination.Item>,
            );
        }
        setItems(items)
    }, [page, pages])

    if (loaded) {
        return (
            <>
            <Container className="my-4">
                <Row className="justify-content-center">
                    <Col lg={6}>
                        <Row className="justify-content-end">
                            <Col><h3>Recent Posts</h3></Col>
                            <Col className="text-end">
                                <Button variant="primary" onClick={()=>setShowModal(true)} >Create Post</Button>
                            </Col>
                        </Row>
                        {posts.length? posts.map((post) => (
                            <Post key={post.id} post={post} update={update} setUpdate={setUpdate} />
                        )) : (
                            <Alert variant="info" className="text-center">No posts here!</Alert>
                        )}
                        <Pagination>{items}</Pagination>
                    </Col>
                </Row>
            </Container>
            <Modal size='lg' show={showModal} centered onHide={()=>setShowModal(false)} >
                <Modal.Header closeButton>
                    <Modal.Title>Create Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PostForm setShowModal={setShowModal} update={update} setUpdate={setUpdate} />
                </Modal.Body>
            </Modal>
            </>
        )
    }
    return (<Loading />)
}
