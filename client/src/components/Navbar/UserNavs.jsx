import React from 'react'
import { useAuth } from '../../hooks/AuthContext'
import { Nav } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

export default function UserNavs() {
    const auth = useAuth()
    const location = useLocation()
    console.log(location.pathname);

    if (auth.user) {
        return (
            < >
            <Nav activeKey={location.pathname} className="me-auto">
                <Nav.Link href="/courseplanner">Course Planner</Nav.Link>
            </Nav>
            </>
        )
    }
    else {
        return (< ></>)
    }
}
