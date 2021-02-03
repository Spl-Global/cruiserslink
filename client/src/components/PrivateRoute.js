// import React, { useContext } from "react";
// import { Route, Redirect } from "react-router-dom";
// import { AuthContext } from "../services/Auth";

// const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
//     const { currentUser } = useContext(AuthContext);
//     return (
//         <Route
//             {...rest}
//             render={routeProps =>
//                 !!currentUser ? (
//                     <RouteComponent {...routeProps} />
//                 ) : (
//                         <Redirect to={"/login"} />
//                     )
//             }
//         />
//     );
// };


// export default PrivateRoute

import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from '../services/Auth'

export default function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth()
    return (
        <Route
            {...rest}
            render={props => {
                return currentUser ? <Component {...props} /> : <Redirect to="/login" />
            }}
        ></Route>
    )
}