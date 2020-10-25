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
import useStyles from './styles/Input';

const PasswordInput = ({
    label,
    name = label,
    error,
    onChange,
    onBlur,
    value,
    required
}) => {
    const classes = useStyles();

    const [shouldShowPassword, setShouldShowPassword] = useState(false);

    const toggleShouldShowPassword = () =>
        setShouldShowPassword(!shouldShowPassword);

    function handleChange(event) {
        const { name, value } = event.target;
        onChange({ name, value });
    }

    return (
        <FormControl
            variant="outlined"
            fullWidth
            error={!!error}
            required={required}
        >
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <OutlinedInput
                id={name}
                className={classes.input}
                type={shouldShowPassword ? 'text' : 'password'}
                name={name}
                value={value}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={toggleShouldShowPassword}
                            onMouseDown={toggleShouldShowPassword}
                            edge="end"
                        >
                            {shouldShowPassword ? (
                                <Visibility />
                            ) : (
                                <VisibilityOff />
                            )}
                        </IconButton>
                    </InputAdornment>
                }
                label={name}
                onChange={handleChange}
                onBlur={e => onBlur(e.target.name)}
                autoComplete="on"
            />
            <FormHelperText className={classes.helperText}>
                {error}
            </FormHelperText>
        </FormControl>
    );
};

export { PasswordInput };
