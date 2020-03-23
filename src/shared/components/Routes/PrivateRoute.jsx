import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../../../providers/user';

const PrivateRoute = props => {
    const { component: Component, ...rest } = props;
    const { user } = useContext(UserContext);

    return (
        <Route
            {...rest}
            render={props => (user.isGuest ? <Redirect to="/login" /> : <Component {...props} />)}
        />
    );
};

export { PrivateRoute };
