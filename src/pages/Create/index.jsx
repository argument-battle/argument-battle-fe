import React, { useEffect, useContext } from 'react';
import { LayoutDataContext } from '../../layout';
import { Container } from '@material-ui/core';
import { CreateDebateForm } from './components/CreateDebateForm';
import useStyles from './styles/CreatePage';

const CreatePage = ({ history }) => {
    const classes = useStyles();

    const { initializeLayout } = useContext(LayoutDataContext);
    useEffect(() => initializeLayout(), [initializeLayout]);
    return (
        <Container component="main" maxWidth="sm" className={classes.container}>
            <CreateDebateForm routerHistory={history} />
        </Container>
    );
};
export { CreatePage };
