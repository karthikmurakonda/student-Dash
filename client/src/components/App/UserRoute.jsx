import { useAuth } from "../../hooks/AuthContext";
import { Route, Redirect } from "react-router";
import Loading from "../Loading/Loading";

export default function UserRoute({ children, ...rest }) {
	const auth = useAuth()
    if (auth.userSet) {
        if (auth.user) {
            return (<Route {...rest} render={() => (children)} />)
        }
        else {
            return (<Route {...rest} render={({location}) => (<Redirect to={{pathname: "login", state: {from: location}}}/>)} />)
        }
    }
    else {
        return (
            <Loading />
        )
    }
}