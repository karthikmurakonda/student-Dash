import { createContext, useContext, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import axios from 'axios'

const server = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL,
	withCredentials: true
});

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
	const [user, setUser] = useState('user',);
	const location = useLocation();
	const history = useHistory();
	const querystring = require('querystring');

	function checkauth() {
		server.get('/login')
			.then((res) => {
				if (res.data.isAuth) {
					// console.log('User is logged in :', res.data.user)
					setUser(res.data.user);
				}
				else {
					// console.log('User is not logged in!')
					setUser()
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function login(username, password) {
		let { from } = location.state || { from: { pathname: "/" } }

		server.post('/login', querystring.stringify({
			username: username, 
			password: password
		}))
		.then((res) => {
			setUser(res.data.user);
			history.push(from);
		})
		.catch((err) => {
			console.log(err);
		});
	}

	function logout() {
		server.post('/logout')
			.then(res => {
				console.log("Logged Out")
				setUser();
			})
			.catch(err => {
				console.log(err)
			})
	}

	function register(username, password) {
		server.post('/register', querystring.stringify({
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

	return {user, login, logout, register, checkauth}
}