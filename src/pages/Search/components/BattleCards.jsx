import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { BattleCard } from './BattleCard';

const BattleCards = ({ routerHistory, battles, totalPages }) => (
    <Box flexGrow={1} overflow="auto" height="100%" width="100%">
        {totalPages ? (
            battles.map((battle, i) => <BattleCard key={i} {...{ battle, routerHistory }} />)
        ) : (
            <Box textAlign="center">
                <Typography>No battles found</Typography>
            </Box>
        )}
    </Box>
);

export { BattleCards };
