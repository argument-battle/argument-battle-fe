import React, { useContext } from 'react';

import { Card, CardHeader, Typography, Box } from '@material-ui/core';
import { Avatar } from '../../../shared/components/Avatar';
import { LogOutButton } from './LogOutButton';
import { GuestSubHeader } from './GuestSubHeader';
import { UserContext } from '../../../providers/user';

const UserProfile = () => {
    const { user } = useContext(UserContext);
    const { avatarUrl, username, isGuest } = user;

    return (
        <Card>
            <CardHeader
                avatar={
                    <Box width="150px" height="150px">
                        <Avatar {...{ username, avatarUrl }} />
                    </Box>
                }
                action={!isGuest && <LogOutButton />}
                title={<Typography variant="h5">{username}</Typography>}
                subheader={isGuest && <GuestSubHeader />}
            />
        </Card>
    );
};

export { UserProfile };
