import React, { useState } from 'react';
import { Input, SubmitInput } from '../../../shared/components/Inputs';
import { Form } from '../../../shared/components/Form';
import { postBattle } from '../../../services/postBattle';

import useForm from '../../../shared/hooks/useForm';
import validationSchema from '../validationSchema';

const CreateBattleForm = () => {
    const [inputs, { setValue, validateInput, validateInputs, getValues }] = useForm(
        { title: '' },
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
        await postBattle(values);
        setIsSubmitting(false);
    };

    const { title } = inputs;

    return (
        <Form onSubmit={handleSubmit} header="CREATE BATTLE">
            <Input
                label={'title'}
                value={title.value}
                onChange={setValue}
                error={title.error}
                onBlur={validateInput}
            />
            <SubmitInput disabled={isSubmitting} value="Create battle" />
        </Form>
    );
};

export { CreateBattleForm };
