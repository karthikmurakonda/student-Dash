import React from 'react'
import { useAuth } from '../../hooks/AuthContext'
import { Nav } from 'react-bootstrap'

export default function UserNavs() {
    const auth = useAuth()

    if (auth.user) {
        return (
            < >
            <Nav className="me-auto">
                <Nav.Link href="courseplanner">Course Planner</Nav.Link>
            </Nav>
            </>
        )
    }
    else {
        return (< ></>)
    }
}
