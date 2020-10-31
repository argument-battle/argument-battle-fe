import React, { useState, useContext, useEffect } from 'react';
import { Input, SubmitInput } from '../../../shared/components/Inputs';
import { Form } from '../../../shared/components/Form';
import { Autocomplete } from '@material-ui/lab';
import useForm from '../../../shared/hooks/useForm';
import validationSchema from '../validationSchema';
import { UserContext } from '../../../providers/user';
import { getDebateClubs } from '../../../services/DebateClub';
import { postDebate } from '../../../services/Debate';
import { useHistory } from 'react-router-dom';
import { PAGE_PATHS } from '../../../Router';

const CreateDebateForm = () => {
    const { getUser } = useContext(UserContext);
    const [
        inputs,
        { setValue, validateInput, validateInputs, getValues }
    ] = useForm(
        { topic: '', debateClub: null, roundCount: 1 },
        validationSchema
    );
    const [clubs, setClubs] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const routerHistory = useHistory();

    const fetchDebateClubs = async () => {
        setClubs(await getDebateClubs());
    };

    useEffect(() => {
        fetchDebateClubs();
    }, []);

    const handleSubmit = async event => {
        event.preventDefault();

        const isValid = await validateInputs();
        if (!isValid) {
            return;
        }

        setIsSubmitting(true);
        const values = getValues();
        const debate = await postDebate(values);
        await getUser();
        setIsSubmitting(false);
        routerHistory.push(`${PAGE_PATHS.DEBATE}/${debate._id}`);
    };

    const { topic, debateClub, roundCount } = inputs;

    return (
        <Form onSubmit={handleSubmit} header="SUKURTI DEBATUS">
            <Input
                label="Tema"
                name="topic"
                value={topic.value}
                onChange={setValue}
                error={topic.error}
                onBlur={validateInput}
            />
            <Autocomplete
                name="debateClub"
                options={clubs}
                getOptionLabel={o => o.name}
                onChange={(_, value) => setValue({ name: 'debateClub', value })}
                value={debateClub.value}
                renderInput={params => (
                    <Input
                        {...params}
                        label="Debatų klubas"
                        onBlur={() => validateInput('debateClub')}
                        error={debateClub.error}
                    />
                )}
                disableClearable
            />
            <Input
                label="Etapų skaičius"
                name="roundCount"
                type="number"
                value={roundCount.value}
                onChange={setValue}
                error={roundCount.error}
                onBlur={validateInput}
            />
            <SubmitInput disabled={isSubmitting} value="Sukurti debatus" />
        </Form>
    );
};

export { CreateDebateForm };
