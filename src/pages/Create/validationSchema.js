import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    topic: Yup.string().required('Šį įvesties lauką privaloma užpildyti'),
    debateClub: Yup.mixed().required('Šį įvesties lauką privaloma užpildyti'),
    roundCount: Yup.number()
        .min(1)
        .max(100)
        .required('Šį įvesties lauką privaloma užpildyti')
});

export default validationSchema;
