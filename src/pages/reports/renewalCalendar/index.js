import { useEffect } from 'react';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { useSelector, useDispatch } from 'react-redux';
import { setGroupsOfSICCodes } from '../../../app/data';

import { TextField, ButtonField } from '../../../components/textField';
import TableReports from '../../../components/tables/tableReports';
import Spinner from '../../../components/spinner';
import Toast from '../../../components/toast';

import { Check, ExclamationTriangle } from '../../../assets/images/icons';

import { useLazyGetBusinessLicensesFilterDatesQuery, useGetAllGroupsOfSICCodesQuery } from '../../../app/api';

export default function RenewalCalendar() {
    const dispatch = useDispatch();
    const { headersOfTables } = useSelector((state) => state.data);

    const { data: AllGroupsOfSICCodes } = useGetAllGroupsOfSICCodesQuery();
    const [GetBusinessLicensesFilterDates, { currentData, isFetching, isSuccess, isError }] = useLazyGetBusinessLicensesFilterDatesQuery();

    useEffect(() => {
        if (AllGroupsOfSICCodes) dispatch(setGroupsOfSICCodes(AllGroupsOfSICCodes));
    }, [AllGroupsOfSICCodes]);

    const validate = Yup.object({
        startEffectiveDate: Yup.date().required('Required'),
        cancelEffectiveDate: Yup.date().required('Required')
    });

    return (
        <div className='form'>
            <div className='form form_border px-5 py-[3vw] lg:px-[2vw]'>
                <h3 className='bold table_h3'>Bulk Renew License:</h3>
                <Formik
                    initialValues={{
                        startEffectiveDate: '',
                        cancelEffectiveDate: ''
                    }}
                    validationSchema={validate}
                    onSubmit={async (values) => {
                        var startEffectiveDate = values.startEffectiveDate;
                        var cancelEffectiveDate = values.cancelEffectiveDate;
                        return startEffectiveDate < cancelEffectiveDate ? await GetBusinessLicensesFilterDates({ startEffectiveDate, cancelEffectiveDate }) : null;
                    }}
                >
                    <Form>
                        <div className='my-5 lg:flex lg:justify-between lg:items-center'>
                            <p className='label'>Select start and end dates:</p>
                            <TextField
                                class1='lg:pt-[2vw] lg:mx-5 lg:w-[30%]'
                                type='datetime-local'
                                name='startEffectiveDate'
                            />
                            <TextField
                                class1='lg:pt-[2vw] lg:mx-5 lg:w-[30%]'
                                type='datetime-local'
                                name='cancelEffectiveDate'
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