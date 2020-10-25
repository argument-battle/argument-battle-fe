import React from 'react';
import { Box } from '@material-ui/core';
import { Pagination as PaginationMUI, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { PAGE_PATHS } from '../../../Router';

const Pagination = ({ location, page, totalPages }) => {
    const makePageUrl = page => {
        const params = new URLSearchParams(location.search);
        if (page === 1) {
            params.delete('page');
        } else {
            params.set('page', page);
        }
        const queryString = params.toString();
        return `${PAGE_PATHS.SEARCH}${queryString ? `?${queryString}` : ''}`;
    };

    return (
        <Box margin={2}>
            <PaginationMUI
                page={page}
                count={totalPages}
                renderItem={item => (
                    <PaginationItem
                        component={Link}
                        to={makePageUrl(item.page)}
                        {...item}
                    />
                )}
            />
        </Box>
    );
};

export { Pagination };
