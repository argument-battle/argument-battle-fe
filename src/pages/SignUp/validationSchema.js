import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    username: Yup.string().required('"Username" is required'),
    email: Yup.string()
        .email('Email is invalid')
        .required('"Email" is required'),
    password: Yup.string().required('"Password" is required'),
    confirmPassword: Yup.string().test('password-match', 'The password does not match!', function(
        value
    ) {
        const password = this.resolve(Yup.ref('password'));
        if (password) {
            return password === value;
        } else {
            return true;
        }
    })
});

export default validationSchema;
