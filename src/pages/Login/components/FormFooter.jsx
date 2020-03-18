import React from 'react';
import { Typography } from '@material-ui/core';
import { Link } from '../../../shared/components/Link';
import { PAGE_PATHS } from '../../../Router';

const FormFooter = () => (
    <>
        <Typography>Dont have an account?&nbsp;</Typography>
        <Link variant="body1" to={PAGE_PATHS.SIGN_UP}>
            Sign up
        </Link>
    </>
);

export { FormFooter };
