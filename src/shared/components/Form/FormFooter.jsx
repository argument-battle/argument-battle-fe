import React from 'react';
import { Box } from '@material-ui/core';
import useStyles from './styles/FormFooter';

const FormFooter = ({ children }) => {
    const classes = useStyles();
    return (
        <Box className={classes.footer}>{React.createElement(children)}</Box>
    );
};

export { FormFooter };
