import React, { useRef } from 'react';
import { useAuth } from '../hooks/AuthContext'

export default function Signup() {
	const idRef = useRef();
	const passRef = useRef();
	const confirmRef = useRef();
	const auth = useAuth();

	function handleSubmit(e) {
		e.preventDefault();
		auth.register(idRef.current.value, passRef.current.value);
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>

                <label>Username</label>
				<input type="text" ref={idRef} required/>

                <label>Password</label>
				<input type="password" ref={passRef} required/>

				<label>Confirm Password</label>
				<input type="confirm-password" ref={confirmRef} required/>

                <input type="submit"/>
			</form>
		</div>
	)
}