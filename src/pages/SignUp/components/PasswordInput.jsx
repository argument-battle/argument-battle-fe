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

const validate = (value, instance) => {
    if (!value) {
        return 'Password is required';
    }

    const {
        values: { confirmPassword },
        __fieldMeta: {
            confirmPassword: { isTouched }
        },
        runValidation
    } = instance.form;
    if (isTouched && value !== confirmPassword) {
        runValidation();
        return 'Passwords must match';
    }

    return false;
};

const PasswordInput = () => {
    const classes = useStyles();

    const {
        meta: { error },
        getInputProps
    } = useField('password', {
        defaultValue: '',
        validate
    });

    const [shouldShowPassword, setShouldShowPassword] = useState(false);

    const toggleShouldShowPassword = () => setShouldShowPassword(!shouldShowPassword);

    return (
        <FormControl variant="outlined" fullWidth error={!!error} required>
            <InputLabel htmlFor={'password'}>Password</InputLabel>
            <OutlinedInput
                id={'password'}
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
                label={'password'}
                {...getInputProps()}
            />
            <FormHelperText className={classes.helperText}>{error}</FormHelperText>
        </FormControl>
    );
};

export { PasswordInput };
