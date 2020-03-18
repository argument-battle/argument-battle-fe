import React from 'react';
import { Typography, Box } from '@material-ui/core';
import useStyles from './styles/FormHeader';

const FormHeader = ({ children }) => {
    const classes = useStyles();
    return (
        <Box className={classes.header}>
            <Typography variant="h4" component="h1">
                {children}
            </Typography>
        </Box>
    );
};

export { FormHeader };
