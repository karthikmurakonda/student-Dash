import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import LoginUtil from './LoginUtil'
import UserNavs from './UserNavs'

export default function MyNav() {
    return (
        <Navbar bg="dark" variant="dark" fixed="top">
            <Container fluid>
                <Navbar.Brand className="mx-3" href="/">Student Dash</Navbar.Brand>
                <UserNavs />
                <LoginUtil className="justify-content-end"/>
            </Container>
        </Navbar>
    )
}
