import React from 'react';
import { Box } from '@material-ui/core';
import { DIRECTION, oppositeDirectionMap } from './constants';
import { useTheme } from '@material-ui/core/styles';

const ArgumentItem = ({ children, isOwner, isFirstTeam }) => {
    const { palette } = useTheme();
    const position = isOwner ? DIRECTION.LEFT : DIRECTION.RIGHT;
    return (
        <Box
            maxWidth="60%"
            padding="20px"
            bgcolor={
                isFirstTeam ? palette.teamGreen.main : palette.teamRed.main
            }
            marginLeft={isOwner ? 'auto' : ''}
            border={1}
            boxShadow={3}
            marginY="10px"
            textAlign={oppositeDirectionMap[position]}
            width="fit-content"
            overflow="hidden"
        >
            {children}
        </Box>
    );
};

export { ArgumentItem };
