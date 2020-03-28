import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { USER_TYPES } from '../constants';

const phrasesUserTypeMap = {
    [USER_TYPES.ATTACKER]: 'Prove them wrong',
    [USER_TYPES.DEFENDER]: 'Defend your statement',
    [USER_TYPES.SPECTATOR]: 'Cast your judgement'
};

function BattleInfo({ title, userType, battleStatus }) {
    const isInLobby = battleStatus === 'lobby';
    return (
        <Box textAlign="center">
            <Typography variant="h3">
                <Box fontWeight="bold">{title} </Box>
            </Typography>
            <Typography variant="h5">
                {isInLobby ? 'Waiting for opponent...' : phrasesUserTypeMap[userType]}
            </Typography>
        </Box>
    );
}

export { BattleInfo };
