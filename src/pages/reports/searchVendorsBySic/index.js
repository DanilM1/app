import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { useSelector } from 'react-redux';

import { SelectField, ButtonField } from '../../../components/textField';
import TableReports from '../../../components/tables/tableReports';
import Spinner from '../../../components/spinner';
import Toast from '../../../components/toast';

import { Check, ExclamationTriangle } from '../../../assets/images/icons';

import { useLazyGetBusinessLicensesFilterSICCodeQuery } from '../../../app/api';

export default function SearchVendorsBySic() {
    const { groupsOfSICCodes, SICCodesReports, headersOfTables } = useSelector((state) => state.data);

    const [GetBusinessLicensesFilterSICCode, { currentData, isFetching, isSuccess, isError }] = useLazyGetBusinessLicensesFilterSICCodeQuery();

    const validate = Yup.object({
        groupOfSICCodesReportsId: Yup.string().matches(/^\d+$/, 'A group of SIC codes is not valid'),
        SICCodeReportsId: Yup.string().matches(/^\d+$/, 'SIC code is not valid')
    });

    return (
        <div className='form'>
            <div className='form form_border px-5 py-[3vw] lg:px-[2vw]'>
                <h3 className='bold table_h3'>Vendor List:</h3>
                <Formik
                    initialValues={{ groupOfSICCodesId: '-', SICCodeId: '-' }}
                    validationSchema={validate}
                    onSubmit={async (values) => { await GetBusinessLicensesFilterSICCode({ groupOfSICCodesId: values.groupOfSICCodesReportsId, SICCodeId: values.SICCodeReportsId }); }}
                >
                    <Form>
                        <div className='my-5 lg:flex lg:justify-between lg:items-center'>
                            <p className='label'>Standard Industrial Classification (SIC Codes):</p>
                            <SelectField
                                class1='lg:pt-[2vw] lg:mx-5 lg:w-[30%]'
                                name='groupOfSICCodesReportsId'
                                options={[groupsOfSICCodes, 'SICCodesReports']}
                            />
                            <SelectField
                                class1='lg:pt-[2vw] lg:mx-5 lg:w-[15%]'
                                name='SICCodeReportsId'
                                options={[SICCodesReports]}
                            />
                            <ButtonField name='Search' />
                        </div>
                    </Form>
                </Formik>
                {isFetching ? <Spinner /> : isSuccess ? <TableReports header={headersOfTables.report} data={currentData} /> : null}
                {isSuccess ?
                    <Toast
                        style='toastSuccess'
                        image={<Check />}
                        message='Success'
                    /> : null}
                {isError ?
                    <Toast
                        style='toastError'
                        image={<ExclamationTriangle />}
                        message='Error'
                    /> : null}
            </div>
        </div>
    );
}