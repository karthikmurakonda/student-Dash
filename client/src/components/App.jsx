import { Switch, Route } from "react-router-dom";
import Login from './Login';
import Signup from "./Signup";
import MyNav from "./Navbar/MyNav";
import Poster from "./Poster/Poster";
import { Container } from "react-bootstrap";

export default function App() {
	return (
		<>
		<Container className="d-flex flex-column overflow-hidden min-vh-100 vh-100 p-0" fluid>
			<MyNav/>
			<Switch>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/signup">
					<Signup />
				</Route>
				<Route path="/">
					<Poster />
				</Route>
			</Switch>
		</Container>
		</>
	);
}