import React from 'react';

import { Typography } from '@material-ui/core';
import { Link } from '../../../shared/components/Link';
import { PAGE_PATHS } from '../../../Router';

const GuestSubHeader = () => {
    return (
        <Typography>
            <Link to={PAGE_PATHS.LOG_IN}>Prisijungti</Link>
            {' | '}
            <Link to={PAGE_PATHS.SIGN_UP}>Registruotis</Link>
        </Typography>
    );
};

export { GuestSubHeader };
