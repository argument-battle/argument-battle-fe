import React from 'react';

import { Card, CardHeader, Typography } from '@material-ui/core';
import { Avatar } from './Avatar';
import { LogOutButton } from './LogOutButton';
import { GuestSubHeader } from './GuestSubHeader';

const UserProfile = ({ user, logoutUser }) => {
    const { avatarUrl, username, isGuest } = user;

    return (
        <Card>
            <CardHeader
                avatar={<Avatar {...{ username, avatarUrl }} />}
                action={!isGuest && <LogOutButton onLogOut={logoutUser} />}
                title={<Typography variant="h5">{username}</Typography>}
                subheader={isGuest && <GuestSubHeader />}
            />
        </Card>
    );
};

export { UserProfile };
