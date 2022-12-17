import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setRoles, setPage } from '../../../app/data';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { TextField, RadioGroup, ButtonField } from '../../../components/textField';
import Spinner from '../../../components/spinner';
import Toast from '../../../components/toast';

import { Check, ExclamationTriangle } from '../../../assets/images/icons';

import { useGetAllRolesQuery, useSignUpMutation } from '../../../app/api';

export default function SignUp() {
    const dispatch = useDispatch();
    const { time, roles } = useSelector((state) => state.data);

    const { data: AllRoles, isLoading: AllRolesIsLoading } = useGetAllRolesQuery();
    const [SignUp, { isLoading: SignUpIsLoading, isSuccess: SignUpIsSuccess, isError: SignUpIsError }] = useSignUpMutation();

    useEffect(() => {
        if (AllRoles) dispatch(setRoles(AllRoles));
    }, [AllRoles]);

    useEffect(() => {
        if (SignUpIsSuccess) setTimeout(() => { dispatch(setPage('Sign in')); }, time);
    }, [SignUpIsSuccess]);

    const validate = Yup.object({
        name: Yup.string().min(3, 'Must be 3 characters or more').max(50, 'Must be 50 characters or less').required('Required'),
        roleId: Yup.string().required('Required'),
        email: Yup.string().max(254, 'Must be 254 characters or less').email('Email is not valid').required('Required'),
        firstName: Yup.string().min(3, 'Must be 3 characters or more').max(50, 'Must be 50 characters or less').required('Required'),
        lastName: Yup.string().min(3, 'Must be 3 characters or more').max(50, 'Must be 50 characters or less').required('Required'),
        password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d~`!@#$%^&*()_\-+=|\\{[}\]:;'<,>.?/]{8,24}$/, 'Should contain at least one digit and at least one lower case and at least one upper case and at least one special character and length must be between 8 to 24 the mentioned characters').required('Required')
    });

    return (
        <div className='px-5 my-5'>
            <div className='app_form form md:w-[33vw] mx-auto'>
                <div className='form form_border px-5 py-[3vw] lg:px-[6.2vw]'>
                    <h2 className='bold form_h2 mb-[1.5vw] text-center'>Sign Up</h2>
                    <Formik
                        initialValues={{
                            name: '',
                            roleId: '',
                            email: '',
                            firstName: '',
                            lastName: '',
                            password: ''
                        }}
                        validationSchema={validate}
                        onSubmit={async (values) => {
                            await SignUp({
                                name: values.name,
                                roleId: parseInt(values.roleId),
                                email: values.email,
                                firstName: values.firstName,
                                lastName: values.lastName,
                                password: values.password
                            }).unwrap();
                        }}
                    >
                        <Form>
                            <div className='flex flex-col justify-center items-center'>
                                <TextField
                                    class1='w-full'
                                    name='name'
                                    type='text'
                                    placeholder='Username'
                                />
                                {AllRolesIsLoading ? <Spinner /> : roles ?
                                    <div className='lg:mb-[.5vw] mb-[1vw] self-start form_p'>
                                        <RadioGroup
                                            class2='lg:w-[30%] lg:mr-[5%]'
                                            label='Possible roles'
                                            name='roleId'
                                            options={roles}
                                        />
                                    </div>
                                    : null}
                                <TextField
                                    class1='w-full'
                                    class3='relative'
                                    name='email'
                                    type='email'
                                    placeholder='Email'
                                />
                                <TextField
                                    class1='w-full'
                                    class3='relative'
                                    name='firstName'
                                    type='text'
                                    placeholder='First name'
                                />
                                <TextField
                                    class1='w-full'
                                    class3='relative'
                                    name='lastName'
                                    type='text'
                                    placeholder='Last name'
                                />
                                <TextField
                                    class1='w-full'
                                    class3='relative'
                                    name='password'
                                    type='password'
                                    placeholder='Password'
                                />
                                <ButtonField name='Sign up' />
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
            {SignUpIsLoading ? <Spinner color='previous_step' /> : null}
            {SignUpIsSuccess ?
                <Toast
                    style='toastSuccess'
                    image={<Check />}
                    message='Success'
                /> : null}
            {SignUpIsError ?
                <Toast
                    style='toastError'
                    image={<ExclamationTriangle />}
                    message='Error'
                /> : null}
        </div>
    );
}