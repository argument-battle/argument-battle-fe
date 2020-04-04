import React, { useState, useContext } from 'react';
import { Input, SubmitInput } from '../../../shared/components/Inputs';
import { Form } from '../../../shared/components/Form';
import { postBattle } from '../../../services/Battle';
import { PAGE_PATHS } from '../../../Router';

import useForm from '../../../shared/hooks/useForm';
import validationSchema from '../validationSchema';
import { UserContext } from '../../../providers/user';

const CreateBattleForm = ({ routerHistory }) => {
    const { getUser } = useContext(UserContext);
    const [inputs, { setValue, validateInput, validateInputs, getValues }] = useForm(
        { topic: '' },
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

        getUser();
        routerHistory.push(`${PAGE_PATHS.BATTLE}/${battle._id}`);
    };

    const { topic } = inputs;

    return (
        <Form onSubmit={handleSubmit} header="CREATE BATTLE">
            <Input
                label={'topic'}
                value={topic.value}
                onChange={setValue}
                error={topic.error}
                onBlur={validateInput}
            />
            <SubmitInput disabled={isSubmitting} value="Create battle" />
        </Form>
    );
};

export { CreateBattleForm };
