import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    username: Yup.string().required('Šį įvesties lauką privaloma užpildyti'),
    email: Yup.string()
        .email('Neteisingas El. paštas')
        .required('Šį įvesties lauką privaloma užpildyti'),
    password: Yup.string().required('Šį įvesties lauką privaloma užpildyti'),
    confirmPassword: Yup.string().test(
        'password-match',
        'Slaptažodžiai nesutampa',
        function(value) {
            const password = this.resolve(Yup.ref('password'));
            if (password) {
                return password === value;
            } else {
                return true;
            }
        }
    ),
    secretCode: Yup.string().required('Šį įvesties lauką privaloma užpildyti')
});

export default validationSchema;
