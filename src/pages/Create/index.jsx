import React, { useEffect, useContext } from 'react';
import { LayoutDataContext } from '../../layout';
import { Container } from '@material-ui/core';
import { CreateBattleForm } from './components/CreateBattleForm';
import useStyles from './styles/CreatePage';

const CreatePage = ({ history }) => {
    const classes = useStyles();

    const { initializeLayout } = useContext(LayoutDataContext);
    useEffect(() => initializeLayout(), []);
    return (
        <Container component="main" maxWidth="sm" className={classes.container}>
            <CreateBattleForm routerHistory={history} />
        </Container>
    );
};
export { CreatePage };
