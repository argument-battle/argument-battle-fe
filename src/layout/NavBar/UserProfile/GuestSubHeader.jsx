import React from 'react';

import { Typography } from '@material-ui/core';
import { Link } from '../../../shared/components/Link';
import { PAGE_PATHS } from '../../../Router';

const GuestSubHeader = () => {
    return (
        <Typography>
            <Link to={PAGE_PATHS.LOG_IN}>Log in</Link>
            {' | '}
            <Link to={PAGE_PATHS.SIGN_UP}>Sign up</Link>
        </Typography>
    );
};

export { GuestSubHeader };
