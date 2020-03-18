import React from 'react';
import { FormControl, InputLabel, OutlinedInput, FormHelperText } from '@material-ui/core';
import useStyles from './styles/Input';
import startCase from 'lodash.startcase';

const Input = ({ label, error, onChange, onBlur, value }) => {
    const classes = useStyles();

    function handleChange(event) {
        const { name, value } = event.target;
        onChange({ name, value });
    }

    return (
        <FormControl variant="outlined" fullWidth error={!!error}>
            <InputLabel htmlFor={label}>{startCase(label)}</InputLabel>
            <OutlinedInput
                id={label}
                label={label}
                name={label}
                className={classes.input}
                onChange={handleChange}
                onBlur={e => onBlur(e.target.name)}
                value={value}
            />
            <FormHelperText className={classes.helperText}>{error}</FormHelperText>
        </FormControl>
    );
};

export { Input };
