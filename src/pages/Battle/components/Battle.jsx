import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Box } from '@material-ui/core';
import { getBattle as getBattleService } from '../../../services/Battle';
import NotFound from '../../../shared/components/NotFound';
import { BattleHeader } from './BattleHeader';
import { Spinner } from '../../../shared/components/Spinner';
import { MessageInput } from './MessageInput';
import { MessageList } from './MessageList';
import { UserContext } from '../../../providers/user';
import socket from '../../../shared/socket';
import { USER_TYPES } from '../../../shared/constants';

const BCOLORS = {
    RED: '#F2DEDE',
    GREEN: '#E6EFEB'
};

const Battle = ({ id }) => {
    const [battle, setBattle] = useState(null);
    const { user } = useContext(UserContext);

    const getBattle = useCallback(async () => {
        const { battle } = await getBattleService({ id });
        setBattle(battle || {});
    }, [id]);

    useEffect(() => {
        getBattle();
        socket.emit('join battle', id);
        socket.on('battle update', () => {
            getBattle();
        });
        return () => {
            socket.emit('leave battle', id);
            socket.off('battle update');
        };
    }, [id, getBattle]);

    const getUserType = useCallback(() => {
        const { attacker, defender } = battle;

        switch (user.username) {
            case defender.username:
                return USER_TYPES.DEFENDER;
            case attacker?.username:
                return USER_TYPES.ATTACKER;
        }
        return USER_TYPES.SPECTATOR;
    }, [battle, user.username]);

    const getBackgroundColor = useCallback(() => {
        const userType = getUserType();

        if (userType === USER_TYPES.ATTACKER) {
            return BCOLORS.RED;
        } else {
            return BCOLORS.GREEN;
        }
    }, [getUserType]);

    if (!battle) {
        return <Spinner />;
    } else if (!battle._id) {
        return <NotFound />;
    }

    const userType = getUserType();
    const isSpectator = userType === USER_TYPES.SPECTATOR;

    return (
        <Box
            display="flex"
            flexDirection="column"
            height="100%"
            bgcolor={getBackgroundColor()}
        >
            <BattleHeader battle={battle} userType={userType} />
            <MessageList battle={battle} userType={userType} />
            {!isSpectator && (
                <MessageInput
                    battleId={battle._id}
                    battleStatus={battle?.status}
                />
            )}
        </Box>
    );
};

export { Battle };
