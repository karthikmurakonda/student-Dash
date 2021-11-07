import React from 'react'
import { Alert } from 'react-bootstrap'
import { useCP } from '../../../hooks/CPContext'

export default function Clashes() {
    const CP = useCP()
    return (
        < >
            { CP.clashes.map(clash => (
                <Alert className='my-1' variant='danger'>
                    {clash[0]} & {clash[1]} clash on {clash[2]}!
                </Alert>
            ))}
        </>
    )
}
