import React, { useState } from 'react';
import {
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    FormHelperText
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useField } from 'react-form';
import useStyles from '../styles/Input';
import startCase from 'lodash.startcase';

const PasswordInput = ({ validate, label }) => {
    const classes = useStyles();

    const {
        meta: { error },
        getInputProps
    } = useField(label, {
        defaultValue: '',
        validate
    });

    const [shouldShowPassword, setShouldShowPassword] = useState(false);

    const toggleShouldShowPassword = () => setShouldShowPassword(!shouldShowPassword);

    return (
        <FormControl variant="outlined" fullWidth error={!!error} required>
            <InputLabel htmlFor={label}>{startCase(label)}</InputLabel>
            <OutlinedInput
                id={label}
                className={classes.input}
                type={shouldShowPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={toggleShouldShowPassword}
                            onMouseDown={toggleShouldShowPassword}
                            edge="end"
                        >
                            {shouldShowPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
                label={label}
                {...getInputProps()}
            />
            <FormHelperText className={classes.helperText}>{error}</FormHelperText>
        </FormControl>
    );
};

export { PasswordInput };
