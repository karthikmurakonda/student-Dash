import React from 'react'
import { useAuth } from '../../hooks/AuthContext'
import { Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'

export default function AdminNavs() {
    const auth = useAuth()
    const history = useHistory()
    
    function handleSelect(eventKey) {
        history.push(eventKey)
    }

    if (auth.user) {
        if (auth.user.role === 1 || auth.user.role === 2) {
            return (
                < >
                <NavDropdown title="Manage Courses" onSelect={handleSelect} >
                    <NavDropdown.Item eventKey="/admin/addcourse" >Add Courses</NavDropdown.Item>
                </NavDropdown>
                </>
            )
        }
    }
    return (< ></>)
}
