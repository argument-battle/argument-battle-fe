import React from 'react';
import { Avatar } from '../../../shared/components/Avatar';
import { Box, Typography } from '@material-ui/core';

function UserInfo({ username, avatarUrl, textDirection }) {
    const _username = username || '????????';

    return (
        <Box display="flex" flexDirection={textDirection === 'right' ? 'row' : 'row-reverse'}>
            <Box width="100px" height="100px">
                <Avatar username={_username} avatarUrl={avatarUrl || ''} />
            </Box>
            <Typography variant="h4">
                <Box fontWeight="fontWeightBold">{_username}</Box>
            </Typography>
        </Box>
    );
}

export { UserInfo };
