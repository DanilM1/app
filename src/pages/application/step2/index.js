import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { useSelector } from 'react-redux';

import { TextField, SelectField, ButtonField } from '../../../components/textField';
import Spinner from '../../../components/spinner';
import Toast from '../../../components/toast';

import { Check, ExclamationTriangle } from '../../../assets/images/icons';

import { useUpdateBusinessLicenseStep2Mutation } from '../../../app/api';

export default function Step2() {
    const { statesUS, cities1, zipCodes1, cities2, zipCodes2, cities3, zipCodes3, cities4, zipCodes4 } = useSelector((state) => state.data);

    const [UpdateBusinessLicense, { isLoading: UpdateBusinessLicenseIsLoading, isSuccess: UpdateBusinessLicenseIsSuccess, isError: UpdateBusinessLicenseIsError }] = useUpdateBusinessLicenseStep2Mutation();

    const validate = Yup.object({
        listAllOwnersPartnersOfficers: Yup.string().max(200, 'Must be 200 characters or less'),

        name1: Yup.string().max(100, 'Must be 100 characters or less'),
        title1: Yup.string().max(100, 'Must be 100 characters or less'),
        businessPhone1: Yup.string().matches(/^[0-9]{5}-[0-9]{3}-[0-9]{4}|$/, 'Phone number is not valid'),
        homePhone1: Yup.string().matches(/^[0-9]{5}-[0-9]{3}-[0-9]{4}|$/, 'Phone number is not valid'),
        homeAddress1: Yup.string().max(200, 'Must be 200 characters or less'),

        name2: Yup.string().max(100, 'Must be 100 characters or less'),
        title2: Yup.string().max(100, 'Must be 100 characters or less'),
        businessPhone2: Yup.string().matches(/^[0-9]{5}-[0-9]{3}-[0-9]{4}|$/, 'Phone number is not valid'),
        homePhone2: Yup.string().matches(/^[0-9]{5}-[0-9]{3}-[0-9]{4}|$/, 'Phone number is not valid'),
        homeAddress2: Yup.string().max(200, 'Must be 200 characters or less'),

        name3: Yup.string().max(100, 'Must be 100 characters or less'),
        title3: Yup.string().max(100, 'Must be 100 characters or less'),
        businessPhone3: Yup.string().matches(/^[0-9]{5}-[0-9]{3}-[0-9]{4}|$/, 'Phone number is not valid'),
        homePhone3: Yup.string().matches(/^[0-9]{5}-[0-9]{3}-[0-9]{4}|$/, 'Phone number is not valid'),
        homeAddress3: Yup.string().max(200, 'Must be 200 characters or less'),

        name4: Yup.string().max(100, 'Must be 100 characters or less'),
        title4: Yup.string().max(100, 'Must be 100 characters or less'),
        businessPhone4: Yup.string().matches(/^[0-9]{5}-[0-9]{3}-[0-9]{4}|$/, 'Phone number is not valid'),
        homePhone4: Yup.string().matches(/^[0-9]{5}-[0-9]{3}-[0-9]{4}|$/, 'Phone number is not valid'),
        homeAddress4: Yup.string().max(200, 'Must be 200 characters or less'),
    });

    return (
        <div className='app_form form md:w-[52vw] mx-auto'>
            <div className='form form_border px-5 py-[3vw] lg:px-[2vw]'>
                <h3 className='bold form_h3'>Owner/Partner Info:</h3>
                <Formik
                    initialValues={{
                        listAllOwnersPartnersOfficers: '',
                        name1: '', title1: '', businessPhone1: '', homePhone1: '', homeAddress1: '', city1Id: undefined, state1Id: undefined, zipCode1Id: undefined,
                        name2: '', title2: '', businessPhone2: '', homePhone2: '', homeAddress2: '', city2Id: undefined, state2Id: undefined, zipCode2Id: undefined,
                        name3: '', title3: '', businessPhone3: '', homePhone3: '', homeAddress3: '', city3Id: undefined, state3Id: undefined, zipCode3Id: undefined,
                        name4: '', title4: '', businessPhone4: '', homePhone4: '', homeAddress4: '', city4Id: undefined, state4Id: undefined, zipCode4Id: undefined
                    }}
                    validationSchema={validate}
                    onSubmit={async (values) => {
                        await UpdateBusinessLicense({
                            listAllOwnersPartnersOfficers: values.listAllOwnersPartnersOfficers,

                            name1: values.name1,
                            title1: values.title1,
                            businessPhone1: values.businessPhone1,
                            homePhone1: values.homePhone1,
                            homeAddress1: values.homeAddress1,
                            city1Id: parseInt(values.city1Id),
                            state1Id: parseInt(values.state1Id),
                            zipCode1Id: parseInt(values.zipCode1Id),

                            name2: values.name2,
                            title2: values.title2,
                            businessPhone2: values.businessPhone2,
                            homePhone2: values.homePhone2,
                            homeAddress2: values.homeAddress2,
                            city2Id: parseInt(values.city2Id),
                            state2Id: parseInt(values.state2Id),
                            zipCode2Id: parseInt(values.zipCode2Id),

                            name3: values.name3,
                            title3: values.title3,
                            businessPhone3: values.businessPhone3,
                            homePhone3: values.homePhone3,
                            homeAddress3: values.homeAddress3,
                            city3Id: parseInt(values.city3Id),
                            state3Id: parseInt(values.state3Id),
                            zipCode3Id: parseInt(values.zipCode3Id),

                            name4: values.name4,
                            title4: values.title4,
                            businessPhone4: values.businessPhone4,
                            homePhone4: values.homePhone4,
                            homeAddress4: values.homeAddress4,
                            city4Id: parseInt(values.city4Id),
                            state4Id: parseInt(values.state4Id),
                            zipCode4Id: parseInt(values.zipCode4Id)
                        }).unwrap();
                    }}
                >
                    <Form>
                        <div className='flex flex-col justify-center items-center'>
                            <TextField
                                class1='lg:flex w-full'
                                class2='lg:w-[60%] lg:mr-[5%]'
                                label='List all owners Partners or officers (attach Separate Sheet, if Needed)'
                                name='listAllOwnersPartnersOfficers'
                                type='text'
                            />

                            <div className='mb-[3vw] w-full'>
                                <div className='lg:flex w-full'>
                                    <TextField
                                        class1='lg:flex lg:w-[50%]'
                                        class2='lg:w-[60%] lg:mr-[5%]'
                                        label='Name'
                                        name='name1'
                                        type='text'
                                    />
                                    <TextField
                                        class1='lg:flex lg:w-[50%]'
                                        class2='lg:w-[40%] lg:ml-[15%]'
                                        label='Title'
                                        name='title1'
                                        type='text'
                                    />
                                </div>
                                <div className='lg:flex w-full'>
                                    <TextField
                                        class1='lg:flex lg:w-[50%]'
                                        class2='lg:w-[60%] lg:mr-[5%]'
                                        label='Business Phone'
                                        name='businessPhone1'
                                        type='tel'
                                        placeholder='12345-123-1234'
                                    />
                                    <TextField
                                        class1='lg:flex lg:w-[50%]'
                                        class2='lg:w-[40%] lg:ml-[15%]'
                                        label='Home Phone'
                                        name='homePhone1'
                                        type='tel'
                                        placeholder='12345-123-1234'
                                    />
                                </div>
                                <TextField
                                    class1='lg:flex w-full'
                                    class2='lg:w-[19%] lg:mr-[5%]'
                                    label='Home Address'
                                    type='text'
                                    name='homeAddress1'
                                />
                                <div className='lg:flex w-full'>
                                    <SelectField
                                        class1='lg:flex lg:w-[35%]'
                                        class2='lg:w-[30%] lg:mr-[5%]'
                                        label='City'
                                        name='city1Id'
                                        options={[cities1, 'zipCodes1']}
                                    />
                                    <SelectField
                                        class1='lg:flex lg:w-[35%]'
                                        class2='lg:w-[35%] lg:mx-[5%]'
                                        label='State'
                                        name='state1Id'
                                        options={[statesUS, 'cities1']}
                                    />
                                    <SelectField
                                        class1='lg:flex lg:w-[30%]'
                                        class2='lg:w-[45%] lg:mx-[5%]'
                                        label='Zip code'
                                        name='zipCode1Id'
                                        options={[zipCodes1]}
                                    />
                                </div>
                            </div>

                            <div className='mb-[3vw] w-full'>
                                <div className='lg:flex w-full'>
                                    <TextField
                                        class1='lg:flex lg:w-[50%]'
                                        class2='lg:w-[60%] lg:mr-[5%]'
                                        label='Name'
                                        name='name2'
                                        type='text'
                                    />
                                    <TextField
                                        class1='lg:flex lg:w-[50%]'
                                        class2='lg:w-[40%] lg:ml-[15%]'
                                        label='Title'
                                        name='title2'
                                        type='text'
                                    />
                                </div>
                                <div className='lg:flex w-full'>
                                    <TextField
                                        class1='lg:flex lg:w-[50%]'
                                        class2='lg:w-[60%] lg:mr-[5%]'
                                        label='Business Phone'
                                        name='businessPhone2'
                                        type='tel'
                                        placeholder='12345-123-1234'
                                    />
                                    <TextField
                                        class1='lg:flex lg:w-[50%]'
                                        class2='lg:w-[40%] lg:ml-[15%]'
                                        label='Home Phone'
                                        name='homePhone2'
                                        type='tel'
                                        placeholder='12345-123-1234'
                                    />
                                </div>
                                <TextField
                                    class1='lg:flex w-full'
                                    class2='lg:w-[19%] lg:mr-[5%]'
                                    label='Home Address'
                                    type='text'
                                    name='homeAddress2'
                                />
                                <div className='lg:flex w-full'>
                                    <SelectField
                                        class1='lg:flex lg:w-[35%]'
                                        class2='lg:w-[30%] lg:mr-[5%]'
                                        label='City'
                                        name='city2Id'
                                        options={[cities2, 'zipCodes2']}
                                    />
                                    <SelectField
                                        class1='lg:flex lg:w-[35%]'
                                        class2='lg:w-[35%] lg:mx-[5%]'
                                        label='State'
                                        name='state2Id'
                                        options={[statesUS, 'cities2']}
                                    />
                                    <SelectField
                                        class1='lg:flex lg:w-[30%]'
                                        class2='lg:w-[45%] lg:mx-[5%]'
                                        label='Zip code'
                                        name='zipCode2Id'
                                        options={[zipCodes2]}
                                    />
                                </div>
                            </div>

                            <div className='mb-[3vw] w-full'>
                                <div className='lg:flex w-full'>
                                    <TextField
                                        class1='lg:flex lg:w-[50%]'
                                        class2='lg:w-[60%] lg:mr-[5%]'
                                        label='Name'
                                        name='name3'
                                        type='text'
                                    />
                                    <TextField
                                        class1='lg:flex lg:w-[50%]'
                                        class2='lg:w-[40%] lg:ml-[15%]'
                                        label='Title'
                                        name='title3'
                                        type='text'
                                    />
                                </div>
                                <div className='lg:flex w-full'>
                                    <TextField
                                        class1='lg:flex lg:w-[50%]'
                                        class2='lg:w-[60%] lg:mr-[5%]'
                                        label='Business Phone'
                                        name='businessPhone3'
                                        type='tel'
                                        placeholder='12345-123-1234'
                                    />
                                    <TextField
                                        class1='lg:flex lg:w-[50%]'
                                        class2='lg:w-[40%] lg:ml-[15%]'
                                        label='Home Phone'
                                        name='homePhone3'
                                        type='tel'
                                        placeholder='12345-123-1234'
                                    />
                                </div>
                                <TextField
                                    class1='lg:flex w-full'
                                    class2='lg:w-[19%] lg:mr-[5%]'
                                    label='Home Address'
                                    type='text'
                                    name='homeAddress3'
                                />
                                <div className='lg:flex w-full'>
                                    <SelectField
                                        class1='lg:flex lg:w-[35%]'
                                        class2='lg:w-[30%] lg:mr-[5%]'
                                        label='City'
                                        name='city3Id'
                                        options={[cities3, 'zipCodes3']}
                                    />
                                    <SelectField
                                        class1='lg:flex lg:w-[35%]'
                                        class2='lg:w-[35%] lg:mx-[5%]'
                                        label='State'
                                        name='state3Id'
                                        options={[statesUS, 'cities3']}
                                    />
                                    <SelectField
                                        class1='lg:flex lg:w-[30%]'
                                        class2='lg:w-[45%] lg:mx-[5%]'
                                        label='Zip code'
                                        name='zipCode3Id'
                                        options={[zipCodes3]}
                                    />
                                </div>
                            </div>

                            <div className='mb-[3vw] w-full'>
                                <div className='lg:flex w-full'>
                                    <TextField
                                        class1='lg:flex lg:w-[50%]'
                                        class2='lg:w-[60%] lg:mr-[5%]'
                                        label='Name'
                                        name='name4'
                                        type='text'
                                    />
                                    <TextField
                                        class1='lg:flex lg:w-[50%]'
                                        class2='lg:w-[40%] lg:ml-[15%]'
                                        label='Title'
                                        name='title4'
                                        type='text'
                                    />
                                </div>
                                <div className='lg:flex w-full'>
                                    <TextField
                                        class1='lg:flex lg:w-[50%]'
                                        class2='lg:w-[60%] lg:mr-[5%]'
                                        label='Business Phone'
                                        name='businessPhone4'
                                        type='tel'
                                        placeholder='12345-123-1234'
                                    />
                                    <TextField
                                        class1='lg:flex lg:w-[50%]'
                                        class2='lg:w-[40%] lg:ml-[15%]'
                                        label='Home Phone'
                                        name='homePhone4'
                                        type='tel'
                                        placeholder='12345-123-1234'
                                    />
                                </div>
                                <TextField
                                    class1='lg:flex w-full'
                                    class2='lg:w-[19%] lg:mr-[5%]'
                                    label='Home Address'
                                    type='text'
                                    name='homeAddress4'
                                />
                                <div className='lg:flex w-full'>
                                    <SelectField
                                        class1='lg:flex lg:w-[35%]'
                                        class2='lg:w-[30%] lg:mr-[5%]'
                                        label='City'
                                        name='city4Id'
                                        options={[cities4, 'zipCodes4']}
                                    />
                                    <SelectField
                                        class1='lg:flex lg:w-[35%]'
                                        class2='lg:w-[35%] lg:mx-[5%]'
                                        label='State'
                                        name='state4Id'
                                        options={[statesUS, 'cities4']}
                                    />
                                    <SelectField
                                        class1='lg:flex lg:w-[30%]'
                                        class2='lg:w-[45%] lg:mx-[5%]'
                                        label='Zip code'
                                        name='zipCode4Id'
                                        options={[zipCodes4]}
                                    />
                                </div>
                            </div>
                            <ButtonField name='Send' />
                        </div>
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