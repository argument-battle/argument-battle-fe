import React, { useState, useCallback, useContext } from 'react';
import { Input, PasswordInput, SubmitInput } from '../../../shared/components/Inputs';
import { Form } from '../../../shared/components/Form';
import { FormFooter } from './FormFooter';
import { useSnackbar } from 'notistack';
import { pushErrorMessageFactory } from '../../../shared/components/Snack';
import { UserContext } from '../../../providers/user';

import useForm from '../../../shared/hooks/useForm';
import validationSchema from '../validationSchema';

const LoginForm = ({ routerHistory }) => {
    const { loginUser } = useContext(UserContext);
    const [inputs, { setValue, validateInput, validateInputs, getValues }] = useForm(
        { email: '', password: '' },
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

        if (response.error) {
            setIsSubmitting(false);
            pushErrorMessage('Prisijungimas nepavyko');
        } else {
            routerHistory.push('/');
        }
    };

    const { email, password } = inputs;

    return (
        <Form onSubmit={handleSubmit} header="PRISIJUNGTI" footer={FormFooter}>
            <Input
                label={'El. paštas'}
                name={'email'}
                value={email.value}
                onChange={setValue}
                error={email.error}
                onBlur={validateInput}
            />
            <PasswordInput
                label={'Slaptažodis'}
                name={'password'}
                value={password.value}
                onChange={setValue}
                error={password.error}
                onBlur={validateInput}
            />
            <SubmitInput disabled={isSubmitting} value="Prisijungti" />
        </Form>
    );
};

export { LoginForm };
