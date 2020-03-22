import React, { useState, useEffect } from 'react';

import { Card, CardHeader, Typography } from '@material-ui/core';
import { getMeUser, logOutUser, getGuestUser } from '../../../services/User';
import { isLoggedIn as getIsLoggedIn } from '../../../shared/components/isLoggedIn';
import { Avatar } from './Avatar';
import { LogOutButton } from './LogOutButton';
import { GuestSubHeader } from './GuestSubHeader';

const UserProfile = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(getIsLoggedIn());
    const [{ avatarUrl, username }, setUser] = useState({});

    const getGuest = async () => {
        const guest = localStorage.getItem('guest');
        if (guest) {
            setUser(JSON.parse(guest));
            return;
        }
        const response = await getGuestUser();
        localStorage.setItem('guest', JSON.stringify(response));
        setUser(response);
    };

    const getUser = async () => {
        const response = await getMeUser();
        setUser(response);
    };

    useEffect(() => {
        if (isLoggedIn) {
            getUser();
        } else {
            getGuest();
        }
    }, [isLoggedIn]);

    const handleLogOut = async () => {
        const response = await logOutUser();
        if (response.message === 'Success') {
            setIsLoggedIn(false);
        }
    };

    return (
        <Card>
            <CardHeader
                avatar={<Avatar {...{ username, avatarUrl }} />}
                action={isLoggedIn && <LogOutButton onLogOut={handleLogOut} />}
                title={<Typography variant="h5">{username}</Typography>}
                subheader={!isLoggedIn && <GuestSubHeader />}
            />
        </Card>
    );
};

export { UserProfile };
