import React, { useEffect, useContext } from 'react';
import { LayoutDataContext } from '../../layout';
import { Container } from '@material-ui/core';
import { NotFound } from '../../shared/components/NotFound';

const NotFoundPage = () => {
    const { initializeLayout } = useContext(LayoutDataContext);
    useEffect(() => initializeLayout(), []);
    return (
        <Container component="main">
            <NotFound />
        </Container>
    );
};
export { NotFoundPage };
