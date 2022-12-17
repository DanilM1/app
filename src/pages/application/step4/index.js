import { useMemo } from 'react';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { useSelector } from 'react-redux';

import { TextField, SelectField, RadioGroup, ButtonField } from '../../../components/textField';
import Spinner from '../../../components/spinner';
import Toast from '../../../components/toast';

import { Check, ExclamationTriangle } from '../../../assets/images/icons';

import { useUpdateBusinessLicenseStep4Mutation } from '../../../app/api';

export default function Step4() {
    const { statesUS, priorOwnerCities, priorOwnerZipCodes } = useSelector((state) => state.data);

    const [UpdateBusinessLicense, { isLoading: UpdateBusinessLicenseIsLoading, isSuccess: UpdateBusinessLicenseIsSuccess, isError: UpdateBusinessLicenseIsError }] = useUpdateBusinessLicenseStep4Mutation();

    const validate = Yup.object({
        licenseReasonOther: Yup.string().max(200, 'Must be 200 characters or less'),
        priorOwnerAddress: Yup.string().max(200, 'Must be 200 characters or less'),
        currentTribalTaxIDnumber: Yup.string().max(200, 'Must be 200 characters or less'),
        shouldAnyNumberBeCancelled: Yup.string().required('Required'),
        cancelEffectiveDate: Yup.date()
    });

    const licenseReason = useMemo(() => [
        { id: 0, name: 'New business located within the jurisdiction of the Tribe (within original boundaries of Lake Traverse Reservation)' },
        { id: 1, name: 'New Business entering the jurisdiction of the Tribe' },
        { id: 2, name: 'More than 50% change in ownership of a business, other than a corporation' },
        { id: 3, name: 'Purchased existing business. Prior owner\'s name' }
    ], []);

    return (
        <div className='app_form form md:w-[52vw] mx-auto'>
            <div className='form form_border px-5 py-[3vw] lg:px-[2vw]'>
                <h2 className='bold form_h2 mb-[1.5vw] text-center'>Tax Identification Number Registration Information</h2>
                <Formik
                    initialValues={{
                        licenseReason: '',
                        licenseReasonOther: '',
                        priorOwnerAddress: '',
                        priorOwnerCityId: undefined,
                        priorOwnerStateId: undefined,
                        priorOwnerZipCodeId: undefined,
                        currentTribalTaxIDnumber: '',
                        shouldAnyNumberBeCancelled: '',
                        cancelEffectiveDate: ''
                    }}
                    validationSchema={validate}
                    onSubmit={async (values) => {
                        await UpdateBusinessLicense({
                            licenseReason: parseInt(values.licenseReason) < 3 ? licenseReason[parseInt(values.licenseReason)].name : values.licenseReasonOther,
                            priorOwnerAddress: values.priorOwnerAddress,
                            priorOwnerCityId: parseInt(values.priorOwnerCityId),
                            priorOwnerStateId: parseInt(values.priorOwnerStateId),
                            priorOwnerZipCodeId: parseInt(values.priorOwnerZipCodeId),
                            currentTribalTaxIDnumber: values.currentTribalTaxIDnumber,
                            shouldAnyNumberBeCancelled: values.shouldAnyNumberBeCancelled === 'true' ? true : false,
                            cancelEffectiveDate: values.cancelEffectiveDate === '' ? null : new Date(values.cancelEffectiveDate)
                        }).unwrap();
                    }}
                >
                    <Form>
                        <div className='flex flex-col justify-center items-center'>
                            <div className='lg:mb-[.5vw] mb-[1vw] self-start form_p'>
                                <RadioGroup
                                    class2='lg:w-[30%] lg:mr-[5%]'
                                    label='If you are now applying for a new Business License and Tribal Tax ID number, indicate the reason:'
                                    name='licenseReason'
                                    field1='licenseReasonOther'
                                    options={licenseReason}
                                />
                                <TextField
                                    class1='lg:flex w-full'
                                    type='text'
                                    name='licenseReasonOther'
                                />
                            </div>
                            <TextField
                                class1='lg:flex w-full'
                                class2='lg:w-[65%] lg:mr-[5%]'
                                label='Prior Owner Address'
                                name='priorOwnerAddress'
                                type='text'
                            />
                            <div className='lg:flex w-full'>
                                <SelectField
                                    class1='lg:flex lg:w-[35%]'
                                    class2='lg:w-[30%] lg:mr-[5%]'
                                    label='City'
                                    name='priorOwnerCityId'
                                    options={[priorOwnerCities, 'priorOwnerZipCodes']}
                                />
                                <SelectField
                                    class1='lg:flex lg:w-[35%]'
                                    class2='lg:w-[35%] lg:mx-[5%]'
                                    label='State'
                                    name='priorOwnerStateId'
                                    options={[statesUS, 'priorOwnerCities']}
                                />
                                <SelectField
                                    class1='lg:flex lg:w-[30%]'
                                    class2='lg:w-[45%] lg:mx-[5%]'
                                    label='Zip code'
                                    name='priorOwnerZipCodeId'
                                    options={[priorOwnerZipCodes]}
                                />
                            </div>
                            <TextField
                                class1='lg:flex w-full'
                                class2='lg:w-[65%] lg:mr-[5%]'
                                label='Current Tribal Tax ID number(s), (other than business owned)'
                                type='text'
                                name='currentTribalTaxIDnumber'
                            />
                            <div className='lg:mb-[.5vw] mb-[1vw] self-start form_p'>
                                <RadioGroup
                                    class2='lg:w-[30%] lg:mr-[5%]'
                                    label='Should any number be cancelled?'
                                    name='shouldAnyNumberBeCancelled'
                                    options={[{ id: true, name: 'Yes' }, { id: false, name: 'No' }]}
                                />
                            </div>
                            <TextField
                                class1='lg:flex w-full'
                                class2='lg:w-[65%] lg:mr-[5%]'
                                label='Cancel Effective Date'
                                type='datetime-local'
                                name='cancelEffectiveDate'
                            />
                        </div>
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