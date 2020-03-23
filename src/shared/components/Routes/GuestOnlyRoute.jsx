import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../../../providers/user';

const GuestOnlyRoute = props => {
    const { component: Component, ...rest } = props;
    const { user } = useContext(UserContext);

    return (
        <Route
            {...rest}
            render={props => (user.isGuest ? <Component {...props} /> : <Redirect to="/" />)}
        />
    );
};

export { GuestOnlyRoute };
