import React, { useRef } from 'react';
import { Box, Input } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { PAGE_PATHS } from '../../../Router';

const Search = ({ location, routerHistory, topic }) => {
    const formRef = useRef(null);

    const handleSubmit = event => {
        event.preventDefault();
        const params = new URLSearchParams(location.search);
        params.set('topic', event.target.topic.value);
        const queryString = params.toString();
        routerHistory.push(`${PAGE_PATHS.SEARCH}${queryString ? `?${queryString}` : ''}`);
    };

    return (
        <Box margin={2} width="100%">
            <form ref={formRef} onSubmit={handleSubmit}>
                <Input
                    label="Search"
                    fullWidth
                    startAdornment={<SearchIcon />}
                    color="secondary"
                    name="topic"
                    defaultValue={topic}
                />
            </form>
        </Box>
    );
};

export { Search };
