import React from 'react';
import { Button } from '@material-ui/core';
import { Input } from './Input';
import { PasswordInput } from './PasswordInput';
import { FormHeader } from './FormHeader';
import { FormFooter } from './FormFooter';
import { useForm } from 'react-form';
import { postUser } from '../../../services/postUser';
import startCase from 'lodash.startcase';

const validate = field => (value, instance) => {
    const isRequiredError = `${startCase(field)} is required`;
    if (!value) {
        return isRequiredError;
    }

    const passwordFieldMap = { password: 'confirmPassword', confirmPassword: 'password' };
    if (Object.keys(passwordFieldMap).includes(field)) {
        const { values, __fieldMeta, setFieldMeta } = instance.form;
        const dependentField = passwordFieldMap[field];
        const { isTouched } = __fieldMeta[dependentField];
        if (isTouched) {
            if (value !== values[dependentField]) {
                if (value === null) {
                    setFieldMeta(dependentField, prevMeta => ({
                        ...prevMeta,
                        error: isRequiredError
                    }));
                    return isRequiredError;
                }
                const error = 'Passwords must match';
                setFieldMeta(dependentField, prevMeta => ({ ...prevMeta, error }));
                return error;
            } else {
                setFieldMeta(dependentField, prevMeta => ({ ...prevMeta, error: null }));
            }
        }
    }

    return false;
};

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
        onSubmit: handleSubmit,
        validate,
        debugForm: true
    });

    return (
        <>
            <FormHeader />
            <Form noValidate>
                <Input validate={validate('username')} label={'username'} />
                <PasswordInput validate={validate('password')} label={'password'} />
                <PasswordInput validate={validate('confirmPassword')} label={'confirmPassword'} />
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
