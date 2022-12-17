import { useSelector } from 'react-redux';

import SearchActiveVendors from './searchActiveVendors';
import SearchVendorsBySic from './searchVendorsBySic';
import RenewalCalendar from './renewalCalendar';

export default function Reports() {
    const { page } = useSelector((state) => state.data);
    return (
        <main className='mx-auto px-5 my-5 w-[100%]'>
            {page === 'Search Active Vendors' ? <SearchActiveVendors /> : null}
            {page === 'Search Vendors By Sic' ? <SearchVendorsBySic /> : null}
            {page === 'Renewal Calendar' ? <RenewalCalendar /> : null}
        </main>
    );
}