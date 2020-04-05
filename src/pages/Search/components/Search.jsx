import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { getAllBattles } from '../../../services/Battle';
import { NotFoundPage } from '../../NotFound';
import { BattleCards } from './BattleCards';
import { SearchInput } from './SearchInput';
import { Pagination } from './Pagination';

const Search = ({ location, routerHistory }) => {
    const params = new URLSearchParams(location.search);
    const page = Number(params.get('page') || 1);
    const pageSize = Number(params.get('pageSize') || 10);
    const topic = params.get('topic');

    const [battles, setBattles] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    const _getAllBattles = async () => {
        let isUnmounted = false;
        let queryParams = { page, pageSize };
        if (topic) {
            queryParams.topic = topic;
        }
        const { battles = [], totalPages = 10 } = await getAllBattles(queryParams);
        if (!isUnmounted) {
            setBattles(battles);
            setTotalPages(totalPages);
        }
        return () => {
            isUnmounted = true;
        };
    };

    useEffect(() => {
        _getAllBattles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, pageSize, topic]);

    return page > totalPages && totalPages !== 0 ? (
        <NotFoundPage />
    ) : (
        <Box display="flex" flexDirection="column" alignItems="center" height="100%">
            <SearchInput {...{ location, routerHistory, topic }} />
            <BattleCards {...{ routerHistory, battles, totalPages }} />
            <Pagination {...{ location, page, totalPages }} />
        </Box>
    );
};

export { Search };
