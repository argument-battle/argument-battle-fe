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
        return 'Confirm Password is required';
    }

    const {
        values: { password },
        __fieldMeta: {
            password: { isTouched }
        },
        runValidation
    } = instance.form;
    if (isTouched && value !== password) {
        runValidation();
        return 'Passwords must match';
    }
    return false;
};

const ConfirmPasswordInput = () => {
    const classes = useStyles();

    const {
        meta: { error },
        getInputProps
    } = useField('confirmPassword', {
        defaultValue: '',
        validate
    });

    const [shouldShowPassword, setShouldShowPassword] = useState(false);

    const toggleShouldShowPassword = () => setShouldShowPassword(!shouldShowPassword);

    return (
        <FormControl variant="outlined" fullWidth error={!!error} required>
            <InputLabel>Confirm Password</InputLabel>
            <OutlinedInput
                id={'confirmPassword'}
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
                label={'confirmPassword'}
                {...getInputProps()}
            />
            <FormHelperText className={classes.helperText}>{error}</FormHelperText>
        </FormControl>
    );
};

export { ConfirmPasswordInput };
