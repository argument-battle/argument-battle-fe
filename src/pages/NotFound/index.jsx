import React, { useEffect, useContext } from 'react';
import { LayoutDataContext } from '../../layout';
import { Typography, Container } from '@material-ui/core';

const NotFoundPage = () => {
    const { initializeLayout } = useContext(LayoutDataContext);
    useEffect(() => initializeLayout(), []);
    return (
        <Container component="main">
            <Typography>404 Not Found Page</Typography>
        </Container>
    );
};
export { NotFoundPage };
