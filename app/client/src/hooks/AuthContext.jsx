import { createContext, useContext, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({children}) {
	const auth = useProvideAuth();

	return (
		<AuthContext.Provider value={auth}>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth() {
	return useContext(AuthContext)
}

function useProvideAuth() {
	const [user, setUser] = useState();
	const location = useLocation();
	const history = useHistory();
	const querystring = require('querystring');

	function signin(username, password) {
		let { from } = location.state || { from: { pathname: "/" } }

		axios.post('/login', querystring.stringify({
			username: username, 
			password: password
		}))
		.then((res) => {
			setUser(res.data.user);
			console.log(res);
			history.push(from);
		})
		.catch((err) => {
			console.log(err);
		});
	}

	function signout() {
		axios.get('/logout')
			.then(res => {
				console.log("Logged Out")
				setUser();
			})
			.catch(err => {
				console.log(err)
			})
	}

	function register(username, password) {
		axios.post('/register', querystring.stringify({
			username: username, 
			password: password
		}))
		.then((res) => {
			console.log(res);
		})
		.catch((err) => {
			console.log(err);
		});
	}

	return {user, signin, signout, register}
}