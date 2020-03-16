import React from 'react';
import { FormControl, InputLabel, OutlinedInput, FormHelperText } from '@material-ui/core';
import { useField } from 'react-form';
import useStyles from '../styles/Input';
import startCase from 'lodash.startcase';

const Input = ({ validate, label }) => {
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
            <InputLabel htmlFor={label}>{startCase(label)}</InputLabel>
            <OutlinedInput
                id={label}
                label={label}
                className={classes.input}
                {...getInputProps()}
            />
            <FormHelperText className={classes.helperText}>{error}</FormHelperText>
        </FormControl>
    );
};

export { Input };
