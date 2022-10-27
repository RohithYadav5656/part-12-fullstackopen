import { useCookies } from "react-cookie"
import { Route, PathRouteProps, LayoutRouteProps, IndexRouteProps, useNavigate } from "react-router"

export const PrivateRoute = (props: PathRouteProps | LayoutRouteProps | IndexRouteProps) => {
    const [cookies] = useCookies(['timed-unlock-token']);
    const isLoggedIn = cookies["timed-unlock-token"];
    const navigate = useNavigate();

    if (!isLoggedIn) {
        navigate("/login");
        return null;
    }

    return <Route {...props} />
}