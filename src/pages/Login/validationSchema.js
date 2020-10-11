import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    email: Yup.string().required('"El. paštas" yra privalomas'),
    password: Yup.string().required('"Slaptažodis" yra privalomas')
});

export default validationSchema;
