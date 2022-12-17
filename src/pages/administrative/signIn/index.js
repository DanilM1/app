import { useSelector, useDispatch } from 'react-redux';
import { setToken, setActive, setPage, setRole } from '../../../app/data';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { TextField, ButtonField } from '../../../components/textField';
import Spinner from '../../../components/spinner';
import Toast from '../../../components/toast';

import { Check, ExclamationTriangle } from '../../../assets/images/icons';

import { useSignInMutation } from '../../../app/api';

export default function SignIn() {
    const dispatch = useDispatch();
    const { time } = useSelector((state) => state.data);

    const [SignIn, { isLoading: SignInIsLoading, isSuccess: SignInIsSuccess, isError: SignInIsError }] = useSignInMutation();

    const validate = Yup.object({
        email: Yup.string().max(254, 'Must be 254 characters or less').email('Email is not valid').required('Required'),
        password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d~`!@#$%^&*()_\-+=|\\{[}\]:;'<,>.?/]{8,24}$/, 'Should contain at least one digit and at least one lower case and at least one upper case and at least one special character and length must be between 8 to 24 the mentioned characters').required('Required')
    });

    return (
        <div className='px-5 my-5'>
            <div className='app_form form md:w-[33vw] mx-auto'>
                <div className='form form_border px-5 py-[3vw] lg:px-[6.2vw]'>
                    <h2 className='bold form_h2 mb-[1.5vw] text-center'>Sign in</h2>
                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        validationSchema={validate}
                        onSubmit={async (values) => {
                            await SignIn({
                                email: values.email,
                                password: values.password
                            }).unwrap()
                                .then(d => {
                                    dispatch(setToken(d.value[0].token));
                                    dispatch(setRole(d.value[0].role));
                                    setTimeout(() => { dispatch(setActive('reports')); dispatch(setPage('Renewal Calendar')); }, time)
                                });
                        }}
                    >
                        <Form>
                            <div className='flex flex-col justify-center items-center'>
                                <TextField
                                    class1='w-full'
                                    class3='relative'
                                    type='text'
                                    name='email'
                                    placeholder='Email'
                                />
                                <TextField
                                    class1='w-full'
                                    class3='relative'
                                    type='password'
                                    name='password'
                                    placeholder='Password'
                                />
                                <ButtonField name='Sign in' />
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
            {SignInIsLoading ? <Spinner color='previous_step' /> : null}
            {SignInIsSuccess ?
                <Toast
                    style='toastSuccess'
                    image={<Check />}
                    message='Success'
                /> : null}
            {SignInIsError ?
                <Toast
                    style='toastError'
                    image={<ExclamationTriangle />}
                    message='Error'
                /> : null}
        </div>
    );
}