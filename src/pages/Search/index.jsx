import React, { useEffect, useContext, useState, useCallback } from 'react';
import { LayoutDataContext } from '../../layout';
import { Container, Box } from '@material-ui/core';
import { getAllBattles } from '../../services/Battle';
import { NotFoundPage } from '../NotFound';
import { BattleCards } from './components/BattleCards';
import { Search } from './components/Search';
import { Pagination } from './components/Pagination';

const SearchPage = ({ location, history: routerHistory }) => {
    const { initializeLayout } = useContext(LayoutDataContext);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => initializeLayout(), []);

    const params = new URLSearchParams(location.search);
    const page = Number(params.get('page') || 1);
    const pageSize = Number(params.get('pageSize') || 10);
    const topic = params.get('topic');

    const [battles, setBattles] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    const _getAllBattles = useCallback(async () => {
        let queryParams = { page, pageSize };
        if (topic) {
            queryParams.topic = topic;
        }
        const { battles = [], totalPages = 10 } = await getAllBattles(queryParams);
        setBattles(battles);
        setTotalPages(totalPages);
    }, [page, pageSize, topic]);

    useEffect(() => {
        _getAllBattles();
    }, [page, pageSize, _getAllBattles]);

    return (
        <Container component="main">
            {page > totalPages && totalPages !== 0 ? (
                <NotFoundPage />
            ) : (
                <Box display="flex" flexDirection="column" alignItems="center" height="100%">
                    <Search {...{ location, routerHistory, topic }} />
                    <BattleCards {...{ routerHistory, battles, totalPages }} />
                    <Pagination {...{ location, page, totalPages }} />
                </Box>
            )}
        </Container>
    );
};

export { SearchPage };
