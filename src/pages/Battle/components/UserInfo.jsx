import React from 'react';
import { Avatar } from '../../../shared/components/Avatar';
import { Box, Typography } from '@material-ui/core';
import startCase from 'lodash.startcase';
import { oppositeDirectionMap, DIRECTION } from '../constants';

const UserInfo = ({ username, avatarUrl, textPosition, userType }) => {
    const _username = username || '????????';
    return (
        <Box
            display="flex"
            flexDirection={textPosition === DIRECTION.RIGHT ? 'row' : 'row-reverse'}
        >
            <Box width="100px" height="100px">
                <Avatar username={_username} avatarUrl={avatarUrl || ''} />
            </Box>
            <Box paddingX={1} textAlign={oppositeDirectionMap[textPosition]}>
                <Typography variant="h4">
                    <Box fontWeight="fontWeightBold">{_username}</Box>
                </Typography>
                <Typography variant="h6">{startCase(userType)}</Typography>
            </Box>
        </Box>
    );
};

export { UserInfo };
