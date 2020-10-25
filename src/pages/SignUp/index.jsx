import React, { useEffect, useContext } from 'react';
import { LayoutDataContext } from '../../layout';
import { Container } from '@material-ui/core';
import { SignUpForm } from './components/SignUpForm';
import useStyles from './styles/SignUpPage';

const SignUpPage = ({ history }) => {
    const classes = useStyles();

    const { initializeLayout } = useContext(LayoutDataContext);
    useEffect(() => initializeLayout({ shouldHideNavBar: true }), [
        initializeLayout
    ]);

    return (
        <Container component="main" maxWidth="sm" className={classes.container}>
            <SignUpForm routerHistory={history} />
        </Container>
    );
};

export { SignUpPage };
