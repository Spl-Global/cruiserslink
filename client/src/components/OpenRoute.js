import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../services/Auth";

const OpenRoute = ({ component: RouteComponent, ...rest }) => {
    const { currentUser } = useAuth()
    // console.log(currentUser)
    return (
        <Route
            {...rest}
            render={routeProps =>
                currentUser ? (
                    <Redirect to={"/"} />
                ) : (
                        <RouteComponent {...routeProps} />
                    )
            }
        />
    );
};


export default OpenRoute
