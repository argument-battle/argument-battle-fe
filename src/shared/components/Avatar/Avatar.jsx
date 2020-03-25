import React from 'react';
import { Box, Avatar as AvatarMUI } from '@material-ui/core';

import useStyles from './styles/Avatar';

const Avatar = ({ username, avatarUrl }) => {
    const classes = useStyles();
    return (
        <Box border={2} borderRadius="50%" height="100%" width="100%">
            <AvatarMUI
                alt={`${username} avatar image`}
                src={avatarUrl}
                className={classes.avatar}
            />
        </Box>
    );
};

export { Avatar };
