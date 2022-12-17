import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { TextField, CheckField, ButtonField } from '../../../components/textField';
import Spinner from '../../../components/spinner';
import Toast from '../../../components/toast';

import { Check, ExclamationTriangle } from '../../../assets/images/icons';

import { useUpdateBusinessLicenseStep5Mutation } from '../../../app/api';

export default function Step5() {
    const [UpdateBusinessLicense, { isLoading: UpdateBusinessLicenseIsLoading, isSuccess: UpdateBusinessLicenseIsSuccess, isError: UpdateBusinessLicenseIsError }] = useUpdateBusinessLicenseStep5Mutation();

    const validate = Yup.object({
        name: Yup.string().min(3, 'Must be 3 characters or more').max(50, 'Must be 50 characters or less').required('Required'),
        password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d~`!@#$%^&*()_\-+=|\\{[}\]:;'<,>.?/]{8,24}$/, 'Should contain at least one digit and at least one lower case and at least one upper case and at least one special character and length must be between 8 to 24 the mentioned characters').required('Required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Password must match').required('Confirm Password is required'),
        secretQuestion: Yup.string().max(200, 'Must be 200 characters or less'),
        secretAnswer: Yup.string().max(24, 'Must be 24 characters or less'),
        email: Yup.string().max(254, 'Must be 254 characters or less').email('Email is not valid').required('Confirm Password is required'),
        confirmEmail: Yup.string().oneOf([Yup.ref('email')], 'Email addresses must match').required('Confirm Password is required'),
        agree: Yup.bool().oneOf([true], 'You need to accept')
    });

    return (
        <div className='app_form form md:w-[52vw] mx-auto'>
            <div className='form form_border px-5 py-[3vw] lg:px-[2vw]'>
                <Formik
                    initialValues={{
                        name: '',
                        password: '',
                        confirmPassword: '',
                        secretQuestion: '',
                        secretAnswer: '',
                        email: '',
                        confirmEmail: '',
                        agree: ''
                    }}
                    validationSchema={validate}
                    onSubmit={async (values) => {
                        await UpdateBusinessLicense({
                            password: values.password,
                            secretQuestion: values.secretQuestion,
                            secretAnswer: values.secretAnswer,
                            email: values.email
                        }).unwrap();
                    }}
                >
                    <Form>
                        <div className='w-full'>
                            <TextField
                                class1='lg:flex w-full'
                                class2='lg:w-[30%] lg:mr-[5%]'
                                label='Username *'
                                type='text'
                                name='name'
                            />
                            <TextField
                                class1='lg:flex w-full'
                                class2='lg:w-[30%] lg:mr-[5%]'
                                class3='relative'
                                label='Password *'
                                type='password'
                                name='password'
                            />
                            <TextField
                                class1='lg:flex w-full'
                                class2='lg:w-[30%] lg:mr-[5%]'
                                label='Confirm Password *'
                                type='password'
                                name='confirmPassword'
                            />
                            <TextField
                                class1='lg:flex w-full'
                                class2='lg:w-[30%] lg:mr-[5%]'
                                label='Secret Question'
                                type='text'
                                name='secretQuestion'
                            />
                            <TextField
                                class1='lg:flex w-full'
                                class2='lg:w-[30%] lg:mr-[5%]'
                                label='Secret Answer'
                                type='text'
                                name='secretAnswer'
                            />
                            <TextField
                                class1='lg:flex w-full'
                                class2='lg:w-[30%] lg:mr-[5%]'
                                label='Email *'
                                type='email'
                                name='email'
                            />
                            <TextField
                                class1='lg:flex w-full'
                                class2='lg:w-[30%] lg:mr-[5%]'
                                label='Confirm Email *'
                                type='email'
                                name='confirmEmail'
                            />
                        </div>
                        <p className='mb-[2vw] app_step5_p'>BY YOUR ELECTRONIC SUBMISSION OF YOUR SWO BUSINESS LICENSE
                            APPLICATION, YOU ARE CONFIRMING THAT YOU UNDERSTAND AND AGREE TO THE FOLLOWING: I declare
                            that I have examined this application and the information contained herein, and to the best
                            of my knowledge and belief, it is true and correct. I hereby affirm that I am authorized as
                            the owner, partner, corporate officer, agent or representative of the entity to sign and
                            submit this document and enter into this consensual relationship with the Sisseton Wahpeton
                            Oyate. I swear or affirm that I will comply with all SWO tribal laws, Federal and other laws
                            applicable to my business and consent to the jurisdiction of the SWO Tribal Court and
                            service of process in matters arising from the conduct of business.</p>
                        <CheckField
                            class3='relative'
                            label='*By submittiing, I agree that all info entered was done accurately & truthfully.'
                            name='agree'
                        />
                        <ButtonField name='Send' />
                    </Form>
                </Formik>
            </div>
            {UpdateBusinessLicenseIsLoading ? <Spinner color='previous_step' /> : null}
            {UpdateBusinessLicenseIsSuccess ?
                <Toast
                    style='toastSuccess'
                    image={<Check />}
                    message='Success'
                /> : null}
            {UpdateBusinessLicenseIsError ?
                <Toast
                    style='toastError'
                    image={<ExclamationTriangle />}
                    message='Error'
                /> : null}
        </div>
    );
}