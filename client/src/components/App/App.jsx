import { Switch, Route } from "react-router-dom";
import Login from '../Login';
import Signup from "../Signup";
import MyNav from "../Navbar/MyNav";
import Poster from "../Poster/Poster";
import Courseplanner from "../CoursePlanner/Courseplanner";
import UserRoute from "./UserRoute";
import { CPProvider } from "../../hooks/CPContext";
import CourseAdd from "../CourseAdd/CourseAdd"
import SlotAdd from "../SlotAdd/SlotAdd"
import AdminRoute from "./AdminRoute"
import Posts from "../Posts/Posts";


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
				<UserRoute path="/posts">
					<Posts />
				</UserRoute>
				<AdminRoute path="/admin/addcourse">
					<CourseAdd />
				</AdminRoute>
				<AdminRoute path="/admin/addslot">
					<SlotAdd />
				</AdminRoute>
				<Route path="/">
					<Poster />
				</Route>
			</Switch>
		</>
	);
}