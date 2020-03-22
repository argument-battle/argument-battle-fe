import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    title: Yup.string().required('This field is required')
});

export default validationSchema;
