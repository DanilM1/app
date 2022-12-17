import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setActive, setPage } from '../../app/data';

import { Bars3, ChevronDown } from '../../assets/images/icons';

export default function Header() {
    const dispatch = useDispatch();
    const { active, page, role } = useSelector((state) => state.data);

    const [navListMenu, onNavListMenu] = useState('-right-full');

    const [administrativeMenu, onAdministrativeMenu] = useState(false);
    const [reportsMenu, onReportsMenu] = useState(false);

    const onPage = (e1, e2) => {
        if (e2 !== 'Home' || (e2 === 'Home' && role === 0)) {
            dispatch(setActive(e1));
            dispatch(setPage(e2));
            onNavListMenu('-right-full');
        }
    }

    return (
        <header>
            <div className='p-6 flex justify-between items-center lg:justify-around lg:static'>
                <h1
                    className='brand'
                    onClick={() => onPage('home', 'Home')}
                >
                    Swo Tax</h1>
                <button className='lg:hidden' onClick={() => onNavListMenu('right-0')}><Bars3 /></button>
                <nav className={`pr-5 fixed top-0 lg:static ${navListMenu}`}>
                    <ul className='lg:flex'>
                        <li
                            className='text-end lg:hidden'
                            onClick={() => onNavListMenu('-right-full')}
                        >
                            x
                        </li>
                        <li
                            className={`${active === 'contact' ? 'active' : ''} ${role > 0 ? 'hidden' : ''}`}
                            onClick={() => onPage('contact', '')}
                        >
                            Contact</li>
                        <li
                            className={`${active === 'application' ? 'active' : ''} ${role > 1 ? '' : 'hidden'}`}
                            onClick={() => onPage('application', '')}
                        >
                            Application</li>
                        <li
                            className={`flex items-center ${active === 'license' ? 'active' : ''} ${role > 1 ? '' : 'hidden'}`}
                            onClick={() => onPage('license', '')}
                        >License<ChevronDown /></li>
                        <li
                            className={`${active === 'administrative' ? 'active' : ''} dropdown ${role > 0 ? 'hidden' : ''}`}
                            onFocus={() => onAdministrativeMenu(true)}
                        >
                            <p className='flex items-center'>Administrative<ChevronDown /></p>
                            <ul className={`dropdown_content w-max ${administrativeMenu ? 'block' : ''} px-5 py-3`}>
                                <li
                                    className={`${page === 'Sign up' ? 'active' : ''}`}
                                    onClick={() => onPage('administrative', 'Sign up')}
                                >
                                    Sign up</li>
                                <li
                                    className={`${page === 'Sign in' ? 'active' : ''}`}
                                    onClick={() => onPage('administrative', 'Sign in')}
                                >
                                    Sign in</li>
                            </ul>
                        </li>
                        <li
                            className={`${active === 'reports' ? 'active' : ''} dropdown ${role > 0 ? '' : 'hidden'}`}
                            onFocus={() => onReportsMenu(true)}
                        >
                            <p className='flex items-center'>Reports<ChevronDown /></p>
                            <ul className={`dropdown_content w-max ${reportsMenu ? 'block' : ''} px-5 py-3`}>
                                <li
                                    className={`${page === 'Search Active Vendors' ? 'active' : ''}`}
                                    onClick={() => onPage('reports', 'Search Active Vendors')}
                                >
                                    Search Active Vendors</li>
                                <li
                                    className={`${page === 'Search Vendors By Sic' ? 'active' : ''}`}
                                    onClick={() => onPage('reports', 'Search Vendors By Sic')}
                                >
                                    Search Vendors By Sic</li>
                                <li
                                    className={`${page === 'Renewal Calendar' ? 'active' : ''}`}
                                    onClick={() => onPage('reports', 'Renewal Calendar')}
                                >
                                    Renewal Calendar</li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}