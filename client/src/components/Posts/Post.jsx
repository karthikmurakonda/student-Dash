import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export default function Post({post}) {
    var date = new Date(post.createdAt)

    function to12hour(hours, mins) {
        if (hours > 12) {
            return (hours%12)+":"+mins+" pm"
        }
        else {
            return hours+":"+mins+" am"
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

    return (
        <Card className="my-3">
            <Card.Header>
                <Row>
                    <Col><strong>{post.author}</strong></Col>
                    <Col><div className="text-end">{timeStamp()}</div></Col>
                </Row>
            </Card.Header>
            <Card.Body>{post.content}</Card.Body>
        </Card>
    )
}
