import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../isLoggedIn';

const GuestOnlyRoute = props => {
    const { component: Component, redirectTo = '/', ...rest } = props;

    return (
        <Route
            {...rest}
            render={props =>
                !isLoggedIn() ? <Component {...props} /> : <Redirect to={redirectTo} />
            }
        />
    );
};

export { GuestOnlyRoute };
