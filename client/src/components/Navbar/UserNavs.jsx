import React from 'react'
import { useAuth } from '../../hooks/AuthContext'
import { Nav } from 'react-bootstrap'

export default function UserNavs() {
    const auth = useAuth()

    if (auth.user) {
        return (
            < >
            <Nav.Link href="/courseplanner">Course Planner</Nav.Link>
            <Nav.Link href="/posts">Posts</Nav.Link>
            </>
        )
    }
    else {
        return (< ></>)
    }
}
