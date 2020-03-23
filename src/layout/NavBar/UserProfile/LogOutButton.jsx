import React, { useContext } from 'react';

import { IconButton } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import { UserContext } from '../../../providers/user';

const LogOutButton = () => {
    const { logoutUser } = useContext(UserContext);
    return (
        <IconButton onClick={logoutUser}>
            <ExitToApp />
        </IconButton>
    );
};

export { LogOutButton };
