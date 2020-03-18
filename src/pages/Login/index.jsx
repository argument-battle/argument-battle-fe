import React, { useEffect, useContext } from 'react';
import { LayoutDataContext } from '../../layout';
import { Container } from '@material-ui/core';
import { LoginForm } from './components/LoginForm';
import useStyles from './styles/LoginPage';

const LoginPage = ({ history }) => {
    const classes = useStyles();

    const { initializeLayout } = useContext(LayoutDataContext);
    useEffect(() => initializeLayout({ shouldHideNavBar: true }), []);

    return (
        <Container component="main" maxWidth="sm" className={classes.container}>
            <LoginForm routerHistory={history} />
        </Container>
    );
};

export { LoginPage };
