import { useState } from 'react';

/** fields: [[name,defaultValue,defaultError]] */
const useForm = fields => {
    const [formValues, setFormValues] = useState(
        fields.reduce((acc, [name, defaultValue = null, defaultError = '']) => {
            return {
                [name]: { value: defaultValue, error: defaultError },
                ...acc
            };
        }, {})
    );

    const setValue = field => value => {
        console.log({ ...formValues, [field]: { ...formValues[field], value } });
        setFormValues({ ...formValues, [field]: { ...formValues[field], value } });
    };

    const setError = field => error => {
        console.log(field, error, formValues);
        setFormValues({ ...formValues, [field]: { ...formValues[field], error } });
    };

    return { formValues, setValue, setError, setFormValues };
};

export { useForm };
