import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from './Login';
import Signup from "./Signup";
import { AuthProvider, useAuth } from '../hooks/AuthContext'

export default function App() {
	return (
		<Router>
			<AuthProvider>
				<Switch>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/signup">
						<Signup />
					</Route>
					<Route path="/">
						<User />
						<ul>
							<li>
								<Link to="/login">Login</Link>
							</li>
							<li>
								<Link to="/signup">Signup</Link>
							</li>
						</ul>
					</Route>
				</Switch>
			</AuthProvider>
		</Router>
	);
}

function User() {
	const auth = useAuth();
	auth.checkauth()
	return auth.user ? (
			<>
				Welcome {auth.user}!
				<button onClick={auth.logout}>Logout</button>
			</>
		) : (
			"You are not signed in!"
		)
}