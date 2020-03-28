import React, { useEffect, useState, useContext } from 'react';
import { Box } from '@material-ui/core';
import { getBattle } from '../../../services/Battle';
import NotFound from '../../../shared/components/NotFound';
import { BattleHeader } from './BattleHeader';
import { Spinner } from '../../../shared/components/Spinner';
import { MessageInput } from './MessageInput';
import { MessageList } from './MessageList';
import { UserContext } from '../../../providers/user';
import socket from '../../../shared/socket';

const USER_TYPES = {
    DEFENDER: 'defender',
    ATTACKER: 'attacker',
    SPECTATOR: 'spectator'
};

const BCOLORS = {
    RED: '#F2DEDE',
    GREEN: '#E6EFEB'
};

function Battle({ id }) {
    const [battle, setBattle] = useState(null);
    const { user } = useContext(UserContext);

    useEffect(() => {
        _getBattle();
        joinBattle();

        return leaveBattle;
    }, []);

    function joinBattle() {
        socket.emit('join battle', id);
    }

    function leaveBattle() {
        socket.emit('leave battle', id);
    }

    async function _getBattle() {
        const { battle } = await getBattle({ id });
        setBattle(battle || {});
    }

    function getUserType() {
        const { attacker, defender } = battle;

        switch (user.username) {
            case defender.username:
                return USER_TYPES.DEFENDER;
            case attacker?.username:
                return USER_TYPES.ATTACKER;
        }
        return USER_TYPES.SPECTATOR;
    }

    function getBackgroundColor() {
        const userType = getUserType();

        if (userType === USER_TYPES.ATTACKER) {
            return BCOLORS.RED;
        } else {
            return BCOLORS.GREEN;
        }
    }

    if (!battle) {
        return <Spinner />;
    } else if (!battle._id) {
        return <NotFound />;
    }

    const userType = getUserType();
    const isSpectator = userType === USER_TYPES.SPECTATOR;

    return (
        <Box display="flex" flexDirection="column" height="100%" bgcolor={getBackgroundColor()}>
            <BattleHeader battle={battle} userType={userType} />
            <MessageList battle={battle} userType={userType} />
            {!isSpectator && <MessageInput battleId={battle._id} />}
        </Box>
    );
}

export { Battle, USER_TYPES };
