import React from 'react';
import { Box } from '@material-ui/core';
import { UserInfo } from './UserInfo';
import { BattleInfo } from './BattleInfo';

function BattleHeader({ battle, userType, bgcolor }) {
    const { title, defender, attacker } = battle;

    return (
        <Box
            bgcolor={bgcolor}
            border={2}
            padding="20px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            boxShadow={3}
        >
            <UserInfo
                username={defender.username}
                avatarUrl={defender.avatarUrl}
                textDirection="right"
            />
            <BattleInfo title={title} userType={userType} />

            <UserInfo
                username={attacker?.username}
                avatarUrl={attacker?.avatarUrl}
                textDirection="left"
            />
        </Box>
    );
}

export { BattleHeader };
