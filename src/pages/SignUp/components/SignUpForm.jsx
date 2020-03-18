import React, { useState } from 'react';

import { Input, PasswordInput, SubmitInput } from '../../../shared/components/Inputs';
import { Form } from '../../../shared/components/Form';
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

        if (response.error) {
            const error = response.error.errmsg || '';
            const isUsernameDuplicate = ['username', 'duplicate'].every(el => error.includes(el));
            if (isUsernameDuplicate) {
                setError({ name: 'username', value: 'Username is already taken' });
            }
            return;
        }
        routerHistory.push('/');
    };

    const { username, password, confirmPassword } = inputs;

    return (
        <Form onSubmit={handleSubmit} header="SIGN UP" footer={FormFooter}>
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
            <SubmitInput disabled={isSubmitting} value="Submit" />
        </Form>
    );
};

export { SignUpForm };
