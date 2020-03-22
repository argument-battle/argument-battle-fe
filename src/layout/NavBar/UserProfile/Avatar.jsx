import React from 'react';

import useStyles from './styles/Avatar';
import { Box, Avatar as AvatarMUI } from '@material-ui/core';

const Avatar = ({ username, avatarUrl }) => {
    const classes = useStyles();
    return (
        <Box border={2} borderRadius="50%">
            <AvatarMUI
                alt={`${username} avatar image`}
                src={avatarUrl}
                className={classes.avatar}
            />
        </Box>
    );
};

export { Avatar };
