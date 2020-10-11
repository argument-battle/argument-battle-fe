import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    username: Yup.string().required('"Slapyvardis" yra privalomas laukas'),
    email: Yup.string()
        .email('Neteisingas El. paštas')
        .required('"El. paštas" yra privalomas laukas'),
    password: Yup.string().required('Slaptažodis" yra privalomas laukas'),
    confirmPassword: Yup.string().test('password-match', 'Slaptažodžiai nesutampa', function(
        value
    ) {
        const password = this.resolve(Yup.ref('password'));
        if (password) {
            return password === value;
        } else {
            return true;
        }
    }),
    secretCode: Yup.string().required('"Slaptas debatu klubo kodas" yra privalomas laukas')
});

export default validationSchema;
