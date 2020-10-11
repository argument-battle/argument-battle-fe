import React from 'react';
import { Typography } from '@material-ui/core';
import { Link } from '../../../shared/components/Link';
import { PAGE_PATHS } from '../../../Router';

const FormFooter = () => (
    <>
        <Typography>Nesi užsiregistravęs?&nbsp;</Typography>
        <Link variant="body1" to={PAGE_PATHS.SIGN_UP}>
            Registruokis
        </Link>
    </>
);

export { FormFooter };
