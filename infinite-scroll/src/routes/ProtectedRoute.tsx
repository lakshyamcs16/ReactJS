import React from 'react';
import { Route, Redirect } from "react-router-dom";
import auth from "../authentication/Authenticator";

interface IProtectedRoute {
    exact: boolean;
    path: string; 
    component: typeof React.Component;
};

function ProtectedRoute(props: IProtectedRoute) {
    const { component: Component, ...rest } = props;
    
    return (
        <Route
      {...rest}
      render={props => {
        if (auth.isAuthenticated()) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
    )
}

export default ProtectedRoute
