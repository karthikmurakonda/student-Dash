import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { useLocation } from 'react-router'
import AdminNavs from './AdminNavs'
import LoginUtil from './LoginUtil'
import UserNavs from './UserNavs'

export default function MyNav() {
    const location = useLocation()

    return (
        <Navbar bg="dark" variant="dark" fixed="top" expand='md'>
            <Container fluid>
                <Navbar.Brand className="mx-3" href="/">Student Dash</Navbar.Brand>
				<Navbar.Toggle />
				<Navbar.Collapse>
					<Nav activeKey={location.pathname} className="me-auto">
						<UserNavs />
						<AdminNavs />
					</Nav>
					<LoginUtil className="justify-content-end"/>
				</Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
