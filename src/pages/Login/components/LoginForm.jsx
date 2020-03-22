import React, { useState, useCallback } from 'react';
import { Input, PasswordInput, SubmitInput } from '../../../shared/components/Inputs';
import { Form } from '../../../shared/components/Form';
import { FormFooter } from './FormFooter';
import { loginUser } from '../../../services/User';
import { useSnackbar } from 'notistack';
import { pushErrorMessageFactory } from '../../../shared/components/Snack';

import useForm from '../../../shared/hooks/useForm';
import validationSchema from '../validationSchema';

const LoginForm = ({ routerHistory }) => {
    const [inputs, { setValue, validateInput, validateInputs, getValues }] = useForm(
        { username: '', password: '' },
        validationSchema
    );
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { enqueueSnackbar } = useSnackbar();
    const pushErrorMessage = useCallback(pushErrorMessageFactory(enqueueSnackbar), [
        enqueueSnackbar,
        pushErrorMessageFactory
    ]);

    const handleSubmit = async event => {
        event.preventDefault();

        const isValid = await validateInputs();
        if (!isValid) {
            return;
        }

        setIsSubmitting(true);
        const values = getValues();
        const response = await loginUser(values);
        setIsSubmitting(false);

        if (response.error) {
            pushErrorMessage('Login failed, wrong user credentials');
        } else {
            routerHistory.push('/');
        }
    };

    const { username, password } = inputs;

    return (
        <Form onSubmit={handleSubmit} header="LOG IN" footer={FormFooter}>
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
                onBlur={validateInput}
            />
            <SubmitInput disabled={isSubmitting} value="Log in" />
        </Form>
    );
};

export { LoginForm };
