import React from 'react';
import {
    FormControl,
    InputLabel,
    OutlinedInput,
    FormHelperText
} from '@material-ui/core';
import useStyles from './styles/Input';

const Input = ({
    label,
    name = label,
    error,
    onChange,
    onBlur = () => {},
    value,
    type = 'text',
    required,
    InputProps = {},
    InputLabelProps = {},
    id = name,
    disabled,
    fullWidth = true,
    size,
    inputProps
}) => {
    const classes = useStyles();

    function handleChange(event) {
        const { name, value } = event.target;
        console.log({ name, value });
        onChange({ name, value });
    }

    return (
        <FormControl
            variant="outlined"
            fullWidth={fullWidth}
            error={!!error}
            required={required}
            disabled={disabled}
            size={size}
        >
            <InputLabel htmlFor={id} {...InputLabelProps}>
                {label}
            </InputLabel>

            <OutlinedInput
                {...InputProps}
                id={id}
                label={name}
                name={name}
                type={type}
                className={classes.input}
                onChange={handleChange}
                onBlur={e => onBlur(e.target.name)}
                value={value}
                inputProps={inputProps}
            />
            <FormHelperText className={classes.helperText}>
                {error}
            </FormHelperText>
        </FormControl>
    );
};

export { Input };
