import React, { useState } from 'react';
import { Input, SubmitInput } from '../../../shared/components/Inputs';
import { Form } from '../../../shared/components/Form';
import { postBattle } from '../../../services/Battle';
import { PAGE_PATHS } from '../../../Router';

import useForm from '../../../shared/hooks/useForm';
import validationSchema from '../validationSchema';

const CreateBattleForm = ({ routerHistory }) => {
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
        const { battle } = await postBattle(values);
        setIsSubmitting(false);

        routerHistory.push(`${PAGE_PATHS.BATTLE}/${battle._id}`);
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
