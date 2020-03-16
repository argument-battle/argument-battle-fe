import React, { useEffect, useContext } from 'react';
import { LayoutDataContext } from '../../layout';
import { Typography, Container } from '@material-ui/core';

const SearchPage = () => {
    const { initializeLayout } = useContext(LayoutDataContext);
    useEffect(() => initializeLayout(), []);
    return (
        <Container component="main">
            <Typography>SearchPage</Typography>
        </Container>
    );
};

export { SearchPage };
