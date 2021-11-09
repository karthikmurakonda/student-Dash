import { useAuth } from "../../hooks/AuthContext";
import { Route, Redirect } from "react-router";
import Loading from "../Loading/Loading";
import NoAccess from "../NoAccess"

export default function AdminRoute({ children, ...rest }) {
	const auth = useAuth()
    
    if (auth.userSet) {
        if (auth.user) {
            if (auth.user.role === 1 || auth.user.role === 2) {
                return (<Route {...rest} render={() => (children)} />)
            }
            else {
                return (<NoAccess />)
            }
        }
        else {
            return (<Route {...rest} render={({location}) => (<Redirect to={{pathname: "/login", state: {from: location}}}/>)} />)
        }
    }
    else {
        return (
            <Loading />
        )
    }
}