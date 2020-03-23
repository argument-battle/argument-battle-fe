import React, { useContext } from 'react';

import { Card, CardHeader, Typography } from '@material-ui/core';
import { Avatar } from './Avatar';
import { LogOutButton } from './LogOutButton';
import { GuestSubHeader } from './GuestSubHeader';
import { UserContext } from '../../../providers/user';

const UserProfile = () => {
    const { user } = useContext(UserContext);
    const { avatarUrl, username, isGuest } = user;

    return (
        <Card>
            <CardHeader
                avatar={<Avatar {...{ username, avatarUrl }} />}
                action={!isGuest && <LogOutButton />}
                title={<Typography variant="h5">{username}</Typography>}
                subheader={isGuest && <GuestSubHeader />}
            />
        </Card>
    );
};

export { UserProfile };
