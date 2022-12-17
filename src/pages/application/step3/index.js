import { useMemo } from 'react';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { useSelector } from 'react-redux';

import { TextField, SelectField, RadioGroup, ButtonField } from '../../../components/textField';
import Spinner from '../../../components/spinner';
import Toast from '../../../components/toast';

import { Check, ExclamationTriangle } from '../../../assets/images/icons';

import { useUpdateBusinessLicenseStep3Mutation } from '../../../app/api';

export default function Step3() {
    const { groupsOfSICCodes, SICCodes1, SICCodes2, SICCodes3, SICCodes4 } = useSelector((state) => state.data);

    const [UpdateBusinessLicense, { isLoading: UpdateBusinessLicenseIsLoading, isSuccess: UpdateBusinessLicenseIsSuccess, isError: UpdateBusinessLicenseIsError }] = useUpdateBusinessLicenseStep3Mutation();

    const validate = Yup.object({
        typeOfLegalOrganizationOther: Yup.string().max(200, 'Must be 200 characters or less'),
        member: Yup.string().required('Required'),
        percentageIsOwnedBySissetonWahpetonOyateMember: Yup.string().matches(/^100(\.0{0,2}?)?$|^\d{0,2}(\.\d{0,2})?$/, 'Percentage is not valid'),
        percentageIsOwnedByAmericanIndians: Yup.string().matches(/^100(\.0{0,2}?)?$|^\d{0,2}(\.\d{0,2})?$/, 'Percentage is not valid'),
        businessLocatedDirections: Yup.string().max(200, 'Must be 200 characters or less')
    });

    const typesOfLegalOrganization = useMemo(() => [
        { id: 0, name: 'Cooperative' },
        { id: 1, name: 'Tribal Franchise Corporation' },
        { id: 2, name: 'Non-Profit Organization' },
        { id: 3, name: 'Estate or Trust' },
        { id: 4, name: 'Non-Tribal Organization' },
        { id: 5, name: 'Financial Institution' },
        { id: 6, name: 'Insurance' },
        { id: 7, name: 'Partnership' },
        { id: 8, name: 'Sole Proprietor' },
        { id: 9, name: 'Native American Owned' },
        { id: 10, name: 'Other (specify)' }
    ], []);

    return (
        <div className='app_form form md:w-[52vw] mx-auto'>
            <div className='form form_border px-5 py-[3vw] lg:px-[2vw]'>
                <h3 className='bold form_h3'>Business Details:</h3>
                <Formik
                    initialValues={{
                        typeOfLegalOrganization: '',
                        typeOfLegalOrganizationOther: '',
                        member: '',
                        percentageIsOwnedBySissetonWahpetonOyateMember: '',
                        percentageIsOwnedByAmericanIndians: '',
                        groupOfSICCodes1Id: undefined,
                        SICCode1Id: undefined,
                        groupOfSICCodes2Id: undefined,
                        SICCode2Id: undefined,
                        groupOfSICCodes3Id: undefined,
                        SICCode3Id: undefined,
                        groupOfSICCodes4Id: undefined,
                        SICCode4Id: undefined,
                        businessLocated: '',
                        businessLocatedDirections: ''
                    }}
                    validationSchema={validate}
                    onSubmit={async (values) => {
                        await UpdateBusinessLicense({
                            typeOfLegalOrganization: parseInt(values.typeOfLegalOrganization) < 10 ? typesOfLegalOrganization[parseInt(values.typeOfLegalOrganization)].name : values.typeOfLegalOrganizationOther,
                            member: values.member === 'true' ? true : false,
                            percentageIsOwnedBySissetonWahpetonOyateMember: values.member === 'true' ? parseFloat(values.percentageIsOwnedBySissetonWahpetonOyateMember) : 0,
                            percentageIsOwnedByAmericanIndians: values.member === 'true' ? parseFloat(values.percentageIsOwnedByAmericanIndians) : 0,
                            groupOfSICCodes1Id: parseInt(values.groupOfSICCodes1Id),
                            SICCode1Id: parseInt(values.SICCode1Id),
                            groupOfSICCodes2Id: parseInt(values.groupOfSICCodes2Id),
                            SICCode2Id: parseInt(values.SICCode2Id),
                            groupOfSICCodes3Id: parseInt(values.groupOfSICCodes3Id),
                            SICCode3Id: parseInt(values.SICCode3Id),
                            groupOfSICCodes4Id: parseInt(values.groupOfSICCodes4Id),
                            SICCode4Id: parseInt(values.SICCode4Id),
                            businessLocated: values.businessLocated === 'true' ? values.businessLocatedDirections : ''
                        }).unwrap();
                    }}
                >
                    <Form>
                        <div className='mb-[3vw]'>
                            <div className='lg:mb-[.5vw] mb-[1vw] self-start form_p'>
                                <RadioGroup
                                    class2='lg:w-[30%] lg:mr-[5%]'
                                    label='Type of Legal Organization (Check one box only)'
                                    name='typeOfLegalOrganization'
                                    field1='typeOfLegalOrganizationOther'
                                    options={typesOfLegalOrganization}
                                />
                                <TextField
                                    class1='lg:flex w-full'
                                    type='text'
                                    name='typeOfLegalOrganizationOther'
                                />
                            </div>
                            <div className='lg:mb-[.5vw] mb-[1vw] self-start form_p'>
                                <RadioGroup
                                    class2='lg:w-[30%] lg:mr-[5%]'
                                    label='Are you a member of the Sisseton Wahpeton Oyate?'
                                    name='member'
                                    field1='percentageIsOwnedBySissetonWahpetonOyateMember'
                                    field2='percentageIsOwnedByAmericanIndians'
                                    options={[{ id: true, name: 'Yes' }, { id: false, name: 'No' }]}
                                />
                            </div>
                            <p className='lg:mb-[.5vw] mb-[1vw] self-start form_p'>If yes, Verification should be attached (blood degree and enrollment number)</p>
                            <TextField
                                class1='lg:flex'
                                class2='lg:w-[48%] lg:mr-[5%]'
                                class4='lg:w-[10vw]'
                                label='What percentage is owned by Sisseton Wahpeton Oyate Member?'
                                type='text'
                                name='percentageIsOwnedBySissetonWahpetonOyateMember'
                            />
                            <TextField
                                class1='lg:flex'
                                class2='lg:w-[48%] lg:mr-[5%]'
                                class4='lg:w-[10vw]'
                                label='What percentage is owned by American Indians?'
                                type='text'
                                name='percentageIsOwnedByAmericanIndians'
                            />
                            <p className='lg:mb-[.5vw] mb-[1vw] self-start form_p'>Standard Industrial Classification (SIC Codes)</p>
                            <div className='lg:flex w-full justify-between'>
                                <SelectField
                                    class1='lg:flex lg:w-[45%]'
                                    name='groupOfSICCodes1Id'
                                    options={[groupsOfSICCodes, 'SICCodes1']}
                                />
                                <SelectField
                                    class1='lg:flex lg:w-[45%]'
                                    name='SICCode1Id'
                                    options={[SICCodes1]}
                                />
                            </div>
                            <div className='lg:flex w-full justify-between'>
                                <SelectField
                                    class1='lg:flex lg:w-[45%]'
                                    name='groupOfSICCodes2Id'
                                    options={[groupsOfSICCodes, 'SICCodes2']}
                                />
                                <SelectField
                                    class1='lg:flex lg:w-[45%]'
                                    name='SICCode2Id'
                                    options={[SICCodes2]}
                                />
                            </div>
                            <div className='lg:flex w-full justify-between'>
                                <SelectField
                                    class1='lg:flex lg:w-[45%]'
                                    name='groupOfSICCodes3Id'
                                    options={[groupsOfSICCodes, 'SICCodes3']}
                                />
                                <SelectField
                                    class1='lg:flex lg:w-[45%]'
                                    name='SICCode3Id'
                                    options={[SICCodes3]}
                                />
                            </div>
                            <div className='lg:flex w-full justify-between'>
                                <SelectField
                                    class1='lg:flex lg:w-[45%]'
                                    name='groupOfSICCodes4Id'
                                    options={[groupsOfSICCodes, 'SICCodes4']}
                                />
                                <SelectField
                                    class1='lg:flex lg:w-[45%]'
                                    name='SICCode4Id'
                                    options={[SICCodes4]}
                                />
                            </div>
                        </div>
                        <div className='lg:mb-[.5vw] mb-[1vw] self-start form_p'>
                            <RadioGroup
                                class2='lg:w-[30%] lg:mr-[5%]'
                                label='Is this business located on a farm or ranch?'
                                name='businessLocated'
                                field1='businessLocatedDirections'
                                options={[{ id: true, name: 'Yes' }, { id: false, name: 'No' }]}
                            />
                        </div>
                        <TextField
                            class1='lg:flex w-full'
                            class2='lg:w-[65%] lg:mr-[5%]'
                            label='If yes, give directions from nearest town'
                            type='text'
                            name='businessLocatedDirections'
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