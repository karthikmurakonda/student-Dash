import React, { useRef } from 'react';
import { useAuth } from '../hooks/AuthContext';

export default function Login() {
	const idRef = useRef();
	const passRef = useRef();
	const auth = useAuth();

	function handleSubmit(e) {
		e.preventDefault();
		auth.signin(idRef.current.value, passRef.current.value);
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>

                <label>Username</label>
				<input type="text" ref={idRef} required/>

                <label>Password</label>
				<input type="password" ref={passRef} required/>

                <input type="submit"/>
			</form>
		</div>
	)
}