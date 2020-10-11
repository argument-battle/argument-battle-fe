import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

const Spinner = () => {
    return (
        <Grid container justify="center" alignItems="center">
            <CircularProgress size="60px" />;
        </Grid>
    );
};

export { Spinner };
