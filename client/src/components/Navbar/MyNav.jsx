import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import LoginUtil from './LoginUtil'

export default function MyNav() {
    return (
        <Navbar bg="dark" variant="dark" sticky="top">
            <Container fluid>
                <Navbar.Brand className="mx-3" href="/">Student Dash</Navbar.Brand>
                <LoginUtil className="justify-content-end"/>
            </Container>
        </Navbar>
    )
}
