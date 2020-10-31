import React, { useCallback, useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { getAllDebates } from '../../../services/Debate';
import { NotFoundPage } from '../../NotFound';
import { DebateCards } from './DebateCards';
import { SearchInput } from './SearchInput';
import { Pagination } from './Pagination';

const Search = ({ location, routerHistory }) => {
    const params = new URLSearchParams(location.search);
    const page = Number(params.get('page') || 1);
    const pageSize = Number(params.get('pageSize') || 10);
    const topic = params.get('topic');

    const [debates, setDebates] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    const _getAllDebates = useCallback(async () => {
        let isUnmounted = false;
        let queryParams = { page, pageSize };
        if (topic) {
            queryParams.topic = topic;
        }
        const { debates = [], totalPages = 10 } = await getAllDebates(
            queryParams
        );
        if (!isUnmounted) {
            setDebates(debates);
            setTotalPages(totalPages);
        }
        return () => {
            isUnmounted = true;
        };
    }, [page, pageSize, topic]);

    useEffect(() => {
        _getAllDebates();
    }, [_getAllDebates]);

    return page > totalPages && totalPages !== 0 ? (
        <NotFoundPage />
    ) : (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            height="100%"
        >
            <SearchInput {...{ location, routerHistory, topic }} />
            <DebateCards {...{ routerHistory, debates, totalPages }} />
            <Pagination {...{ location, page, totalPages }} />
        </Box>
    );
};

export { Search };
