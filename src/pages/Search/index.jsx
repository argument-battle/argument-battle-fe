import React, { useEffect, useContext } from 'react';
import { LayoutDataContext } from '../../layout';
import { Container } from '@material-ui/core';
import { Search } from './components/Search';

const SearchPage = ({ location, history: routerHistory }) => {
    const { initializeLayout } = useContext(LayoutDataContext);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => initializeLayout(), []);

    return (
        <Container component="main">
            <Search {...{ location, routerHistory }} />
        </Container>
    );
};

export { SearchPage };
