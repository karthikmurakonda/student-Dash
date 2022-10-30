import React from 'react'
import { Card, Col, ListGroup, Row, Button } from 'react-bootstrap'
import axios from 'axios'
import { useAuth } from '../../hooks/AuthContext'

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const server = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL + '/post',
    withCredentials: true
})

export default function Post({post, update, setUpdate}) {
    var date = new Date(post.created_at)
    const auth = useAuth()

    function to12hour(hours, mins) {
        if (hours > 12) {
            if (mins === 0) {
                return (hours%12)+":00 pm"
            }
            else if (mins<10) {
                return (hours%12)+":0"+mins+" pm" 
            }
            return (hours%12)+":"+mins+" pm"
        }
        else {
            if (mins === 0) {
                return (hours)+":00 am"
            }
            else if (mins<10) {
                return (hours)+":0"+mins+" am" 
            }
            return (hours)+":"+mins+" am"
        }
    }

    function timeStamp() {
        const today = new Date()
        if (today.getYear() === date.getYear()) {
            if (today.getMonth() === date.getMonth()) {
                if (today.getDay() === date.getDay()) {
                    return to12hour(date.getHours(),date.getMinutes())
                }
                else {
                    return days[date.getDay()]
                }
            }
            else {
                return months[date.getMonth()]
            }
        }
        else {
            return date.getFullYear()
        }
    }

    function deletePost() {
        server.delete('/'+post.id)
            .then((res) => {
                setUpdate(!update)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <Card className="my-3">
            <Card.Header>
                <Row>
                    <Col><strong>{post.author}</strong></Col>
                    <Col><div className="text-end">{timeStamp()}</div></Col>
                </Row>
            </Card.Header>
            <Card.Body>
                {post.content}
            </Card.Body>
            {(auth.user.role === 1 || auth.user.role === 2 || auth.user.username === post.author)? (
                <ListGroup><div className="text-end px-3 py-1"><Button onClick={deletePost} variant="outline-danger"><i className="bi bi-trash-fill"></i></Button></div></ListGroup>
            ):(
                <></>
            )}
            
        </Card> 
    )
}
