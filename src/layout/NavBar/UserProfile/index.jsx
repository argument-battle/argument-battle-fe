import React, { useContext } from 'react';

import { Card, CardHeader, Typography } from '@material-ui/core';
import { Avatar } from '../../../shared/components/Avatar';
import { LogOutButton } from './LogOutButton';
import { GuestSubHeader } from './GuestSubHeader';
import { UserContext } from '../../../providers/user';

import useStyles from './styles/UserProfile';

const UserProfile = () => {
    const { card, ...headerClasses } = useStyles();
    const { user } = useContext(UserContext);
    const { avatarUrl, username, isGuest } = user;

    return (
        <Card className={card}>
            <CardHeader
                avatar={<Avatar {...{ username, avatarUrl }} />}
                classes={headerClasses}
                action={!isGuest && <LogOutButton />}
                title={<Typography variant="h5">{username}</Typography>}
                subheader={isGuest && <GuestSubHeader />}
            />
        </Card>
    );
};

export { UserProfile };
