import React from 'react';
import { Typography, Box } from '@material-ui/core';
import useStyles from '../styles/FormHeader';

const FormHeader = () => {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <Typography variant="h4" component="h1">
                SIGN UP
            </Typography>
        </Box>
    );
};

export { FormHeader };
