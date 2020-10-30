import { useState } from 'react';

function structureInitialInputs(initialInputs) {
    const structedInitialInputs = Object.keys(initialInputs).reduce(
        (acc, input) =>
            Object.assign(acc, {
                [input]: { value: initialInputs[input], error: null }
            }),
        {}
    );
    return structedInitialInputs;
}

export default function useForm(
    initialInputs,
    validationSchema,
    { defaultMessage = 'error' } = {}
) {
    const [inputs, setInputs] = useState(structureInitialInputs(initialInputs));

    function setInput({ name, value, field }) {
        if (inputs[name][field] !== value) {
            inputs[name][field] = value;
            setInputs({ ...inputs });
        }
    }

    function resetErrors() {
        Object.keys(inputs).forEach(input => (inputs[input].error = null));
        setInputs({ ...inputs });
    }

    function setValue({ name, value }) {
        setInput({ name, value, field: 'value' });
        setError({ name, value: '' });
    }

    function setError({ name, value }) {
        setInput({ name, value, field: 'error' });
    }

    function getValues() {
        const values = {};

        for (const input in inputs) {
            values[input] = inputs[input].value;
        }
        return values;
    }

    async function validateInput(name) {
        try {
            await validationSchema.validateAt(name, getValues());
            setError({ name, value: '' });
        } catch (err) {
            console.log(err);
            setError({ name, value: err.message || defaultMessage });
        }
    }

    async function validateInputs() {
        try {
            resetErrors();
            await validationSchema.validate(getValues(), {
                abortEarly: false
            });
            return true;
        } catch (err) {
            err.inner.forEach(
                ({ path, message }) => (inputs[path].error = message)
            );
            setInputs({ ...inputs });
            return false;
        }
    }

    return [
        inputs,
        { setValue, getValues, validateInputs, validateInput, setError }
    ];
}
