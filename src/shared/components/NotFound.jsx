import React from 'react';
import { Box, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

function NotFound({ history }) {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%"
            flexDirection="column"
        >
            <Box fontSize="200px">404</Box>
            <Box marginTop="-50px" fontSize="40px" fontWeight="lighter" marginBottom="40px">
                PAGE NOT FOUND
            </Box>
            <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => history.push('/')}
            >
                BACK TO HOME
            </Button>
        </Box>
    );
}

export default withRouter(NotFound);
