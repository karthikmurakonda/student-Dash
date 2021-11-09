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
	const [userSet, setUserSet] = useState(false)
	const location = useLocation();
	const history = useHistory();

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
				setUserSet(true)
			})
			.catch((err) => {
				console.log(err);
			})
	}

	function login(username, password, setShowAlert) {
		let { from } = location.state || { from: { pathname: "/" } }

		server.post('/login', {
			username: username, 
			password: password
		})
		.then((res) => {
			setUser(res.data.user);
			history.push(from);
		})
		.catch((err) => {
			setShowAlert(true)
		})
	}

	function logout() {
		server.post('/logout')
			.then(res => {
				history.push('/')
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
			
		});
	}

	function usernameExists(username) {
		return new Promise(async (resolve, reject) => {
			try {
            	const response = await server.post('/usernameexists', {
                    username: username
                })
                if (response.data.usernameExists){
                    resolve(false)
                }
                else {
                    resolve(true)
                }
            } catch (error) {
                console.log(error.response);
            }
		})
	}

	return {user, userSet, login, logout, register, checkauth, usernameExists}
}
