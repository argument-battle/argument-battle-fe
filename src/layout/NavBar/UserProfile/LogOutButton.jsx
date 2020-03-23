import React from 'react';

import { IconButton } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';

const LogOutButton = ({ onLogOut }) => {
    return (
        <IconButton onClick={onLogOut}>
            <ExitToApp />
        </IconButton>
    );
};

export { LogOutButton };
