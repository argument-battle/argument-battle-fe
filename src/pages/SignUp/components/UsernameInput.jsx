import React from 'react';
import { FormControl, InputLabel, OutlinedInput, FormHelperText } from '@material-ui/core';
import { useField } from 'react-form';
import useStyles from '../styles/Input';

const validate = value => {
    if (!value) return 'Username is required';
    return false;
};

const UsernameInput = () => {
    const classes = useStyles();

    const {
        meta: { error },
        getInputProps
    } = useField('username', {
        defaultValue: '',
        validate
    });

    return (
        <FormControl variant="outlined" fullWidth error={!!error} required>
            <InputLabel htmlFor="username">Username</InputLabel>
            <OutlinedInput
                id="username"
                label="username"
                className={classes.input}
                {...getInputProps()}
            />
            <FormHelperText className={classes.helperText}>{error}</FormHelperText>
        </FormControl>
    );
};

export { UsernameInput };
