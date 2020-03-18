import React from 'react';
import { Button } from '@material-ui/core';

const SubmitInput = ({ disabled, value }) => (
    <Button
        fullWidth
        variant="contained"
        color="secondary"
        size="large"
        type="submit"
        disabled={disabled}
    >
        {value}
    </Button>
);

export { SubmitInput };
