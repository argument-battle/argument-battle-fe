import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { DebateCard } from './DebateCard';

const DebateCards = ({ routerHistory, debates, totalPages }) => (
    <Box flexGrow={1} overflow="auto" height="100%" width="100%">
        {totalPages ? (
            debates.map((debate, i) => (
                <DebateCard key={i} {...{ debate, routerHistory }} />
            ))
        ) : (
            <Box textAlign="center">
                <Typography>Nerasta debatų</Typography>
            </Box>
        )}
    </Box>
);

export { DebateCards };
