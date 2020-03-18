import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Input } from './Input';
import { PasswordInput } from './PasswordInput';
import { FormHeader } from './FormHeader';
import { FormFooter } from './FormFooter';
import { postUser } from '../../../services/postUser';

import useForm from '../../../shared/hooks/useForm';
import validationSchema from '../validationSchema';

const SignUpForm = ({ routerHistory }) => {
    const [inputs, { setValue, validateInput, validateInputs, getValues, setError }] = useForm(
        { username: '', password: '', confirmPassword: '' },
        validationSchema
    );
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async event => {
        event.preventDefault();

        const isValid = await validateInputs();
        if (!isValid) {
            return;
        }

        setIsSubmitting(true);
        const values = getValues();
        const response = await postUser(values);
        setIsSubmitting(false);

        if (response.errors) {
            const { path, type } = response.errors[0];
            if (path === 'username' && type === 'unique violation') {
                setError({ name: 'username', value: 'Username is already taken' });
            }
            return;
        }
        routerHistory.push('/');
    };

    const { username, password, confirmPassword } = inputs;

    return (
        <>
            <FormHeader />
            <form onSubmit={handleSubmit}>
                <Input
                    label={'username'}
                    value={username.value}
                    onChange={setValue}
                    error={username.error}
                    onBlur={validateInput}
                />
                <PasswordInput
                    label={'password'}
                    value={password.value}
                    onChange={setValue}
                    error={password.error}
                    onBlur={() => {
                        validateInput('password');
                        validateInput('confirmPassword');
                    }}
                />
                <PasswordInput
                    label={'confirmPassword'}
                    value={confirmPassword.value}
                    onChange={setValue}
                    error={confirmPassword.error}
                    onBlur={validateInput}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    size="large"
                    type="submit"
                    disabled={isSubmitting}
                >
                    Submit
                </Button>
            </form>
            <FormFooter />
        </>
    );
};

export { SignUpForm };
