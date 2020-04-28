import React, { useState, useContext } from 'react';

import { Input, PasswordInput, SubmitInput } from '../../../shared/components/Inputs';
import { Form } from '../../../shared/components/Form';
import { FormFooter } from './FormFooter';

import useForm from '../../../shared/hooks/useForm';
import validationSchema from '../validationSchema';
import { UserContext } from '../../../providers/user';

const SignUpForm = ({ routerHistory }) => {
    const [inputs, { setValue, validateInput, validateInputs, getValues, setError }] = useForm(
        { username: '', email: '', password: '', confirmPassword: '' },
        validationSchema
    );
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { postUser } = useContext(UserContext);

    const handleSubmit = async event => {
        event.preventDefault();

        const isValid = await validateInputs();
        if (!isValid) {
            return;
        }

        setIsSubmitting(true);
        const values = getValues();
        const response = await postUser(values);

        if (response.error) {
            setIsSubmitting(false);

            const error = response.error.errmsg || '';
            const isUsernameDuplicate = ['username', 'duplicate'].every(el => error.includes(el));
            if (isUsernameDuplicate) {
                setError({ name: 'username', value: 'Username is already taken' });
                return;
            }
            const isEmailDuplicate = ['email', 'duplicate'].every(el => error.includes(el));
            if (isEmailDuplicate) {
                setError({ name: 'email', value: 'Email is already taken' });
                return;
            }
            return;
        }
        routerHistory.push('/');
    };

    const { username, email, password, confirmPassword } = inputs;

    return (
        <Form onSubmit={handleSubmit} header="SIGN UP" footer={FormFooter}>
            <Input
                label="username"
                value={username.value}
                onChange={setValue}
                error={username.error}
                onBlur={validateInput}
                required
            />
            <Input
                label="email"
                value={email.value}
                onChange={setValue}
                error={email.error}
                onBlur={validateInput}
                type="email"
                required
            />
            <PasswordInput
                label="password"
                value={password.value}
                onChange={setValue}
                error={password.error}
                onBlur={() => {
                    validateInput('password');
                    validateInput('confirmPassword');
                }}
                required
            />
            <PasswordInput
                label="confirmPassword"
                value={confirmPassword.value}
                onChange={setValue}
                error={confirmPassword.error}
                onBlur={validateInput}
                required
            />
            <SubmitInput disabled={isSubmitting} value="Submit" />
        </Form>
    );
};

export { SignUpForm };
