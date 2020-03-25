import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { USER_TYPES } from './Battle';

const PHRASES = {
    ATTACKER: 'Prove them wrong',
    DEFENDER: 'Defend your statement',
    SPECTATOR: 'Cast your judgement'
};

function BattleInfo({ title, userType }) {
    let text;

    switch (userType) {
        case USER_TYPES.SPECTATOR:
            text = PHRASES.SPECTATOR;
            break;
        case USER_TYPES.ATTACKER:
            text = PHRASES.ATTACKER;
            break;
        case USER_TYPES.DEFENDER:
            text = PHRASES.DEFENDER;
            break;
    }

    return (
        <Box textAlign="center">
            <Typography variant="h3">
                <Box fontWeight="bold">{title} </Box>
            </Typography>
            <Typography variant="h5">{text}</Typography>
        </Box>
    );
}

export { BattleInfo };
