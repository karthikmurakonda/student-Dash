import { createContext, useContext, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import axios from 'axios'

const server = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL+'/auth',
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
	const [user, setUser] = useState();
	const [resp, setResp] = useState();
	const [regResp, setRegResp] = useState()
	const location = useLocation();
	const history = useHistory();

	function checkauth() {
		server.get('/login')
			.then((res) => {
				if (res.data.isAuth) {
					console.log('User is logged in :', res.data.user)
					setUser(res.data.user);
				}
				else {
					console.log('User is not logged in!')
					setUser()
				}
			})
			.catch((err) => {
				console.log(err);
			})
	}

	function login(username, password) {
		let { from } = location.state || { from: { pathname: "/" } }

		setResp()

		server.post('/login', {
			username: username, 
			password: password
		})
		.then((res) => {
			setUser(res.data.user);
			history.push(from);
		})
		.catch((err) => {
			setResp(err.response.status)
		})
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

	function register(fname, lname, email, username, password) {
		server.post('/register', {
			fname: fname,
			lname: lname,
			email: email,
			username: username, 
			password: password
		})
		.then((res) => {
			history.push('/login');
		})
		.catch((err) => {
			if (err.response.status === 401) {
				setRegResp({
					error: err.response.data.name,
					message: err.response.data.message
				})
			}
		});
	}

	function usernameExists(username) {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await server.post('register', {
					fname: '',
					lname: '',
					email: '',
					username: username, 
					password: ''
				})
				console.log(response);
			} catch (error) {
				console.log(error.response.data.name);
				if (error.response.data.name === 'UserExistsError') {
					console.log(true);
					resolve(false)
				}
				else {
					console.log(false);
					resolve(true)
				}
			}
			
			// .catch((err) => {
			// 	// console.log(err.response)
			// 	console.log(err.response.name)
			// 	if (err.response.name === 'UserExistsError') {
			// 		console.log(false)
			// 		resolve(false)
			// 	}
			// 	else {
			// 		console.log(true);
			// 		resolve(true)
			// 	}
			// })
		})
	}

	return {user, resp, regResp, setRegResp, setResp, login, logout, register, checkauth, usernameExists}
}