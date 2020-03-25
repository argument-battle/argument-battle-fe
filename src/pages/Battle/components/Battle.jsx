import React, { useEffect, useState, useContext } from 'react';
import { getBattle } from '../../../services/Battle';
import { NotFound } from '../../../shared/components/NotFound';
import { BattleHeader } from './BattleHeader';
import { Spinner } from '../../../shared/components/Spinner';
import { UserContext } from '../../../providers/user';

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
    }, []);

    async function _getBattle() {
        const { battle } = await getBattle({ id });
        setBattle(battle);
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
    }

    return battle._id ? (
        <>
            <BattleHeader battle={battle} userType={getUserType()} bgcolor={getBackgroundColor()} />
        </>
    ) : (
        <NotFound />
    );
}

export { Battle, USER_TYPES };
