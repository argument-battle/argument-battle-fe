import React from 'react';
import { Box } from '@material-ui/core';
import { MESSAGE_POSITIONS } from './MessageList';

const Message = ({ children, bgcolor, position }) => (
    <Box
        maxWidth="60%"
        padding="20px"
        bgcolor={bgcolor}
        marginLeft={position === MESSAGE_POSITIONS.LEFT ? 'auto' : ''}
        border={1}
        boxShadow={3}
        marginY="10px"
        textAlign={position === MESSAGE_POSITIONS.LEFT ? 'right' : 'left'}
        width="fit-content"
        overflow="hidden"
    >
        {children}
    </Box>
);

export { Message };
