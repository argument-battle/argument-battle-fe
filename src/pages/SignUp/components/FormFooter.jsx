import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { Link } from '../../../shared/Link';
import useStyles from '../styles/FormFooter';
import { PAGE_PATHS } from '../../../Router';

const FormFooter = () => {
    const classes = useStyles();
    return (
        <Box className={classes.footer}>
            <Typography>Already have an account?&nbsp;</Typography>
            <Link variant="body1" to={PAGE_PATHS.SIGN_IN}>
                Sign in
            </Link>
        </Box>
    );
};

export { FormFooter };
