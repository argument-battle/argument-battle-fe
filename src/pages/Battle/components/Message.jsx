import React from 'react';
import { Box } from '@material-ui/core';
import { DIRECTION, oppositeDirectionMap } from '../constants';

const Message = ({ children, bgcolor, position }) => (
    <Box
        maxWidth="60%"
        padding="20px"
        bgcolor={bgcolor}
        marginLeft={position === DIRECTION.LEFT ? 'auto' : ''}
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

export { Message };
