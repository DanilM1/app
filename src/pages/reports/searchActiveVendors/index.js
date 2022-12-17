import { useSelector } from 'react-redux';

import TableReports from '../../../components/tables/tableReports';
import Spinner from '../../../components/spinner';
import Toast from '../../../components/toast';

import { Check, ExclamationTriangle } from '../../../assets/images/icons';

import { useGetAllBusinessLicensesQuery } from '../../../app/api';

export default function SearchActiveVendors() {
    const { headersOfTables } = useSelector((state) => state.data);
    const { currentData, isFetching, isSuccess, isError } = useGetAllBusinessLicensesQuery();

    return (
        <div className='form'>
            <div className='form form_border px-5 py-[3vw] lg:px-[2vw]'>
                <h3 className='bold table_h3'>Vendor List:</h3>
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