import { useEffect } from 'react';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { useSelector, useDispatch } from 'react-redux';
import { setStatesUS } from '../../../app/data';

import { TextField, SelectField, ButtonField } from '../../../components/textField';
import Spinner from '../../../components/spinner';
import Toast from '../../../components/toast';

import { Check, ExclamationTriangle } from '../../../assets/images/icons';

import { useGetAllStatesUSQuery, useAddNewBusinessLicenseMutation } from '../../../app/api';

export default function Step1() {
    const dispatch = useDispatch();
    const { statesUS, citiesOfStateBusiness, zipCodesOfCityBusiness, citiesOfStateMailing, zipCodesOfCityMailing } = useSelector((state) => state.data);

    const { data: AllStatesUS } = useGetAllStatesUSQuery();
    const [AddNewBusinessLicense, { isLoading: AddNewBusinessLicenseIsLoading, isSuccess: AddNewBusinessLicenseIsSuccess, isError: AddNewBusinessLicenseIsError }] = useAddNewBusinessLicenseMutation();

    useEffect(() => {
        if (AllStatesUS) dispatch(setStatesUS(AllStatesUS));
    }, [AllStatesUS]);

    const validate = Yup.object({
        businessName: Yup.string().max(100, 'Must be 100 characters or less').required(),
        firstName: Yup.string().max(50, 'Must be 50 characters or less').required('Required'),
        middleInitial: Yup.string().max(5, 'Must be 5 characters or less'),
        lastName: Yup.string().max(50, 'Must be 50 characters or less').required('Required'),
        businessTradeName: Yup.string().max(200, 'Must be 200 characters or less'),
        ID_SSN: Yup.string().matches(/^[0-9]{9,9}$/, 'Federal ID/SSN is not valid'),
        businessAddress: Yup.string().max(200, 'Must be 200 characters or less').required('Required'),
        businessCityId: Yup.string().required('Required'),
        businessStateId: Yup.string().required('Required'),
        businessZipCodeId: Yup.string().required('Required'),
        mailingAddress: Yup.string().max(200, 'Must be 200 characters or less'),
        dayTimePhone: Yup.string().matches(/^[0-9]{5}-[0-9]{3}-[0-9]{4}$/, 'Phone number is not valid').required('Required'),
        otherPhone: Yup.string().matches(/^[0-9]{5}-[0-9]{3}-[0-9]{4}|$/, 'Phone number is not valid'),
        fax: Yup.string().matches(/^[0-9]{5}-[0-9]{3}-[0-9]{4}|$/, 'Fax number is not valid')
    });

    return (
        <div className='app_form form md:w-[52vw] mx-auto'>
            <div className='form form_border px-5 py-[3vw] lg:px-[2vw]'>
                <h2 className='bold form_h2 mb-[1.5vw] text-center'>Business License Registration</h2>
                <h3 className='bold form_h3'>Business Info:</h3>
                <Formik
                    initialValues={{
                        businessName: '',
                        firstName: '',
                        middleInitial: '',
                        lastName: '',
                        businessTradeName: '',
                        ID_SSN: '',
                        businessAddress: '',
                        businessCityId: undefined,
                        businessStateId: undefined,
                        businessZipCodeId: undefined,
                        mailingAddress: '',
                        mailingCityId: undefined,
                        mailingStateId: undefined,
                        mailingZipCodeId: undefined,
                        dayTimePhone: '',
                        otherPhone: '',
                        fax: ''
                    }}
                    validationSchema={validate}
                    onSubmit={async (values) => {
                        await AddNewBusinessLicense({
                            businessName: values.businessName,
                            firstName: values.firstName,
                            middleInitial: values.middleInitial,
                            lastName: values.lastName,
                            businessTradeName: values.businessTradeName,
                            ID_SSN: values.ID_SSN,
                            businessAddress: values.businessAddress,
                            businessCityId: parseInt(values.businessCityId),
                            businessStateId: parseInt(values.businessStateId),
                            businessZipCodeId: parseInt(values.businessZipCodeId),
                            mailingAddress: values.mailingAddress,
                            mailingCityId: parseInt(values.mailingCityId),
                            mailingStateId: parseInt(values.mailingStateId),
                            mailingZipCodeId: parseInt(values.mailingZipCodeId),
                            dayTimePhone: values.dayTimePhone,
                            otherPhone: values.otherPhone,
                            fax: values.fax
                        }).unwrap();
                    }}
                >
                    <Form>
                        <div className='flex flex-col justify-center items-center'>
                            <TextField
                                class1='lg:flex w-full'
                                class2='lg:w-[65%] lg:mr-[5%]'
                                label='Full Legal Name of Business *'
                                name='businessName'
                                type='text'
                            />
                            <div className='lg:flex w-full'>
                                <TextField
                                    class1='lg:flex lg:w-[40%]'
                                    class2='lg:w-[47%] lg:mr-[5%]'
                                    label='First Name *'
                                    name='firstName'
                                    type='text'
                                />
                                <TextField
                                    class1='lg:flex lg:w-[15%]'
                                    class2='lg:w-[30%] lg:mx-[15%]'
                                    label='MI'
                                    name='middleInitial'
                                    type='text'
                                />
                                <TextField
                                    class1='lg:flex lg:w-[45%]'
                                    class2='lg:w-[45%] lg:mx-[5%]'
                                    label='Last Name *'
                                    name='lastName'
                                    type='text'
                                />
                            </div>
                            <TextField
                                class1='lg:flex w-full'
                                class2='lg:w-[65%] lg:mr-[5%]'
                                label='Business Trade Name(s) (doing business as) if you have any'
                                name='businessTradeName'
                                type='text'
                            />
                            <TextField
                                class1='lg:flex lg:w-5/6 w-full self-start'
                                class2='lg:w-[95%] lg:mr-[5%]'
                                label='Federal ID/SSN *'
                                name='ID_SSN'
                                type='text'
                            />
                            <TextField
                                class1='lg:flex w-full'
                                class2='lg:w-[65%] lg:mr-[5%]'
                                label='Complete address of Business in location *'
                                name='businessAddress'
                                type='text'
                            />
                            <div className='lg:flex w-full'>
                                <SelectField
                                    class1='lg:flex lg:w-[35%]'
                                    class2='lg:w-[30%] lg:mr-[5%]'
                                    label='City *'
                                    name='businessCityId'
                                    options={[citiesOfStateBusiness, 'zipCodesOfCityBusiness']}
                                />
                                <SelectField
                                    class1='lg:flex lg:w-[35%]'
                                    class2='lg:w-[35%] lg:mx-[5%]'
                                    label='State *'
                                    name='businessStateId'
                                    options={[statesUS, 'citiesOfStateBusiness']}
                                />
                                <SelectField
                                    class1='lg:flex lg:w-[30%]'
                                    class2='lg:w-[45%] lg:mx-[5%]'
                                    label='Zip code *'
                                    name='businessZipCodeId'
                                    options={[zipCodesOfCityBusiness]}
                                />
                            </div>
                            <TextField
                                class1='lg:flex w-full'
                                class2='lg:w-[65%] lg:mr-[5%]'
                                label='Complete Mailing address if different from above'
                                name='mailingAddress'
                                type='text'
                            />
                            <div className='lg:flex w-full'>
                                <SelectField
                                    class1='lg:flex lg:w-[35%]'
                                    class2='lg:w-[30%] lg:mr-[5%]'
                                    label='City'
                                    name='mailingCityId'
                                    options={[citiesOfStateMailing, 'zipCodesOfCityMailing']}
                                />
                                <SelectField
                                    class1='lg:flex lg:w-[35%]'
                                    class2='lg:w-[35%] lg:mx-[5%]'
                                    label='State'
                                    name='mailingStateId'
                                    options={[statesUS, 'citiesOfStateMailing']}
                                />
                                <SelectField
                                    class1='lg:flex lg:w-[30%]'
                                    class2='lg:w-[45%] lg:mx-[5%]'
                                    label='Zip code'
                                    name='mailingZipCodeId'
                                    options={[zipCodesOfCityMailing]}
                                />
                            </div>
                            <div className='lg:flex w-full'>
                                <TextField
                                    class1='lg:flex lg:w-[35%]'
                                    class2='lg:w-[65%] lg:mr-[5%]'
                                    label='Day time phone *'
                                    name='dayTimePhone'
                                    type='tel'
                                    placeholder='12345-123-1234'
                                />
                                <TextField
                                    class1='lg:flex lg:w-[35%]'
                                    class2='lg:w-[35%] lg:mx-[5%]'
                                    label='Other phone'
                                    name='otherPhone'
                                    type='tel'
                                    placeholder='12345-123-1234'
                                />
                                <TextField
                                    class1='lg:flex lg:w-[30%]'
                                    class2='lg:w-[45%] lg:mx-[5%]'
                                    label='Fax #'
                                    name='fax'
                                    type='tel'
                                    placeholder='12345-123-1234'
                                />
                            </div>
                            <ButtonField name='Send' />
                        </div>
                    </Form>
                </Formik>
            </div>
            {AddNewBusinessLicenseIsLoading ? <Spinner color='previous_step' /> : null}
            {AddNewBusinessLicenseIsSuccess ?
                <Toast
                    style='toastSuccess'
                    image={<Check />}
                    message='Success'
                /> : null}
            {AddNewBusinessLicenseIsError ?
                <Toast
                    style='toastError'
                    image={<ExclamationTriangle />}
                    message='Error'
                /> : null}
        </div>
    );
}