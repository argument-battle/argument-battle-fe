import React, { useEffect, useContext } from 'react';
import { LayoutDataContext } from '../../layout';
import { Typography, Container } from '@material-ui/core';

const BattlePage = () => {
    const { initializeLayout } = useContext(LayoutDataContext);
    useEffect(() => initializeLayout(), []);
    return (
        <Container component="main">
            <Typography>BattlePage</Typography>
        </Container>
    );
};

export { BattlePage };
