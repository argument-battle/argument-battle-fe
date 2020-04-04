import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    topic: Yup.string().required('This field is required')
});

export default validationSchema;
