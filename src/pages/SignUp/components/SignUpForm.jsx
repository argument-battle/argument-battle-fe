import React from 'react';
import { Button } from '@material-ui/core';
import { UsernameInput } from './UsernameInput';
import { PasswordInput } from './PasswordInput';
import { ConfirmPasswordInput } from './ConfirmPasswordInput';
import { FormHeader } from './FormHeader';
import { FormFooter } from './FormFooter';
import { useForm } from 'react-form';
import { postUser } from '../../../services/postUser';

const handleSubmitErrors = (errors, instance) => {
    errors.forEach(({ type, path, message }) => {
        if (type === 'unique violation' && path === 'username') {
            instance.setFieldMeta('username', prevMeta => ({
                ...prevMeta,
                error: message
            }));
        }
    });
};

const SignUpForm = ({ routerHistory }) => {
    const handleSubmit = async (values, instance) => {
        const response = await postUser(values);
        if (response.errors) {
            handleSubmitErrors(response.errors, instance);
            return;
        }
        routerHistory.push('/');
    };

    const {
        Form,
        meta: { isSubmitting, canSubmit }
    } = useForm({
        onSubmit: handleSubmit
    });

    return (
        <>
            <FormHeader />
            <Form noValidate>
                <UsernameInput />
                <PasswordInput />
                <ConfirmPasswordInput />
                <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    size="large"
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                >
                    Submit
                </Button>
            </Form>
            <FormFooter />
        </>
    );
};

export { SignUpForm };
