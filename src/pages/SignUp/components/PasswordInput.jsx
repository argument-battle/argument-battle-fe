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
import useStyles from '../styles/Input';
import startCase from 'lodash.startcase';

const PasswordInput = ({ label, error, onChange, onBlur, value }) => {
    const classes = useStyles();

    const [shouldShowPassword, setShouldShowPassword] = useState(false);

    const toggleShouldShowPassword = () => setShouldShowPassword(!shouldShowPassword);

    function handleChange(event) {
        const { name, value } = event.target;
        onChange({ name, value });
    }

    return (
        <FormControl variant="outlined" fullWidth error={!!error}>
            <InputLabel htmlFor={label}>{startCase(label)}</InputLabel>
            <OutlinedInput
                id={label}
                className={classes.input}
                type={shouldShowPassword ? 'text' : 'password'}
                name={label}
                value={value}
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
                onChange={handleChange}
                onBlur={e => onBlur(e.target.name)}
                autoComplete="on"
            />
            <FormHelperText className={classes.helperText}>{error}</FormHelperText>
        </FormControl>
    );
};

export { PasswordInput };
