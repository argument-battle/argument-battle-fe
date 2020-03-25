import React, { useEffect, useContext } from 'react';
import { LayoutDataContext } from '../../layout';
import { Container } from '@material-ui/core';
import { Battle } from './components/Battle';

const BattlePage = ({ match }) => {
    const { initializeLayout } = useContext(LayoutDataContext);
    useEffect(() => initializeLayout(), []);
    return (
        <Container component="main" disableGutters={true} maxWidth={false}>
            <Battle id={match.params.battleId} />
        </Container>
    );
};

export { BattlePage };
