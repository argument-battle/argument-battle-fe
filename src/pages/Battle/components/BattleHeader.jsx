import React from 'react';
import { Box } from '@material-ui/core';
import { UserInfo } from './UserInfo';
import { BattleInfo } from './BattleInfo';
import { DIRECTION } from '../constants';
import { USER_TYPES } from '../../../shared/constants';

function BattleHeader({ battle, userType }) {
    const { title, defender, attacker, status } = battle;

    return (
        <Box
            padding="20px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            boxShadow={3}
        >
            <UserInfo
                username={defender.username}
                avatarUrl={defender.avatarUrl}
                userType={USER_TYPES.DEFENDER}
                textPosition={DIRECTION.RIGHT}
            />
            <BattleInfo title={title} userType={userType} battleStatus={status} />

            <UserInfo
                username={attacker?.username}
                avatarUrl={attacker?.avatarUrl}
                userType={USER_TYPES.ATTACKER}
                textPosition={DIRECTION.LEFT}
            />
        </Box>
    );
}

export { BattleHeader };
