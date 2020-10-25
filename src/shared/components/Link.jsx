import React from 'react';
import { Link as MUILink } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const Link = props => (
    <MUILink variant="body1" component={RouterLink} {...props} />
);

export { Link };
