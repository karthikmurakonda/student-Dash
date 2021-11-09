import React, { useEffect } from 'react'
import { Nav, NavDropdown, Button } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { useAuth } from '../../hooks/AuthContext'

export default function LoginUtil() {
    const auth = useAuth()
    const history = useHistory()
    useEffect(() => {
        auth.checkauth()
    }, [])

    function login() {
        history.push('/login')
    }

    function signup() {
        history.push('/signup')
    }

    if (auth.user) {
        return (
            <Nav>
                <NavDropdown align="end" title={auth.user.username}>
                    <NavDropdown.Item onClick={auth.logout}>Logout</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        )
    }
    else {
        return(
            <Nav>
                <Nav.Item className="mx-2" onClick={login}>
                    <Nav.Link className="link-white">Log In</Nav.Link>
                </Nav.Item>
                <Button className="mx-1" variant="outline-light" onClick={signup}>Sign Up</Button>
            </Nav>
        )
    }
}

