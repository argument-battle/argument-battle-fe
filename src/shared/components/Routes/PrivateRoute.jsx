import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../isLoggedIn';

const PrivateRoute = props => {
    const { component: Component, ...rest } = props;

    return (
        <Route
            {...rest}
            render={props => (isLoggedIn() ? <Component {...props} /> : <Redirect to="/login" />)}
        />
    );
};

export { PrivateRoute };
