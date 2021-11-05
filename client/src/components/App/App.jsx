import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import Login from '../Login';
import Signup from "../Signup";
import MyNav from "../Navbar/MyNav";
import Poster from "../Poster/Poster";
import { Container } from "react-bootstrap";
import Courseplanner from "../CourseList/Courseplanner";
import UserRoute from "./UserRoute";


export default function App() {
	return (
		<>
			<MyNav/>
			<Switch>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/signup">
					<Signup />
				</Route>
				<UserRoute path="/courseplanner">
					<Courseplanner />
				</UserRoute>
				<Route path="/">
					<Poster />
				</Route>
			</Switch>
		</>
	);
}