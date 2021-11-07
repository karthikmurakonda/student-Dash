import { Switch, Route } from "react-router-dom";
import Login from '../Login';
import Signup from "../Signup";
import MyNav from "../Navbar/MyNav";
import Poster from "../Poster/Poster";
import Courseplanner from "../CoursePlanner/Courseplanner";
import UserRoute from "./UserRoute";
import { CPProvider } from "../../hooks/CPContext";


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
					<CPProvider>
						<Courseplanner />
					</CPProvider>
				</UserRoute>
				<Route path="/">
					<Poster />
				</Route>
			</Switch>
		</>
	);
}