import { useState, useRef, useMemo, forwardRef, useEffect } from 'react';

import { useTable, useFilters, useSortBy, usePagination, useBlockLayout, useResizeColumns, useRowSelect } from 'react-table';

import { Bars3, ChevronDown, ChevronUp } from '../../assets/images/icons';

export default function TableReports(props) {
    const [showTableColumn, onShowTableColumn] = useState(true);

    const data = useMemo(() => props.data, [props.data]);

    const columns = useMemo(() => props.header, [props.header]);

    const DefaultColumnFilter = ({ column: { filterValue, setFilter } }) => { return (<input value={filterValue || ''} onChange={e => { setFilter(e.target.value || undefined) }} />); };

    const defaultColumn = useMemo(() => ({ Filter: DefaultColumnFilter }), []);

    const IndeterminateCheckbox = forwardRef(
        ({ indeterminate, ...rest }, ref) => {
            const defaultRef = useRef();
            const resolvedRef = ref || defaultRef;

            useEffect(() => {
                resolvedRef.current.indeterminate = indeterminate;
            }, [resolvedRef, indeterminate])

            return (<input type='checkbox' ref={resolvedRef} {...rest} className='my-1 w-5 h-5' />);
        }
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
        allColumns
    } = useTable({ columns, data, defaultColumn, initialState: { pageIndex: 0 } }, useFilters, useSortBy, usePagination, useBlockLayout, useResizeColumns, useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                {
                    id: 'selection',
                    Header: ({ getToggleAllRowsSelectedProps }) => (<IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />),
                    Cell: ({ row }) => (<IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />),
                },
                ...columns,
            ])
        }
    );

    return (
        <>
            <p className='table_h3' onClick={() => onShowTableColumn(!showTableColumn)}><Bars3 /></p>
            <div className={`my-5 flex flex-wrap ${showTableColumn ? 'hidden' : ''}`}>
                {allColumns.map(column => (
                    <div key={column.id} className='mr-[1vw] flex'>
                        <input type='checkbox' {...column.getToggleHiddenProps()} className='w-5 h-5' />
                        <label className='ml-2'>{column.id}</label>
                    </div>
                ))}
            </div>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()} className='flex items-end'>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())} className='px-5 my-3'>{column.render('Header')}
                                    {column.isSorted
                                        ? column.isSortedDesc
                                            ? <ChevronDown />
                                            : <ChevronUp />
                                        : ''}
                                    <div className='filter'>{column.canFilter ? column.render('Filter') : null}</div>
                                    <div {...column.getResizerProps()} className={`resizer ${column.isResizing ? 'isResizing' : ''}`} />
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td className='px-5 my-1' {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <div className='pagination py-5'>
                <button className='p-1' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'|<'}</button>
                <button className='p-1' onClick={() => previousPage()} disabled={!canPreviousPage}>{'<'}</button>
                <input
                    type='number'
                    value={pageIndex + 1}
                    onChange={e => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0;
                        gotoPage(page);
                    }}
                    className='w-[5vw]'
                />
                <span>/ {pageCount}</span>
                <button className='p-1' onClick={() => nextPage()} disabled={!canNextPage}>{'>'}</button>
                <button className='p-1' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>|'}</button>
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                    className='w-auto'
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (<option key={pageSize} value={pageSize}>{pageSize}</option>))}
                </select>
                <span>items per page</span>
            </div>
        </>
    );
}