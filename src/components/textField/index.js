import { useFormikContext, Field, ErrorMessage } from 'formik';

import { useDispatch } from 'react-redux';
import {
    setSICCodes1,
    setSICCodes2,
    setSICCodes3,
    setSICCodes4,
    setSICCodesReports,
    setCitiesOfStateBusiness,
    setZipCodesOfCityBusiness,
    setCitiesOfStateMailing,
    setZipCodesOfCityMailing,
    setCities1,
    setZipCodes1,
    setCities2,
    setZipCodes2,
    setCities3,
    setZipCodes3,
    setCities4,
    setZipCodes4,
    setPriorOwnerCities,
    setPriorOwnerZipCodes
} from '../../app/data';

import { useLazyGetSICCodesQuery, useLazyGetCitiesQuery, useLazyGetZipCodesQuery } from '../../app/api';

export function TextField(props) {
    return (
        <div className={`field ${props.class1}`}>
            <label className={props.class2}>{props.label}</label>
            <div className='w-full relative'>
                <Field type={props.type} name={props.name} placeholder={props.placeholder} autoComplete='off' className={props.class4} />
                <ErrorMessage name={props.name}>{msg => <p className={`active absolute ${props.class3}`}>{msg}</p>}</ErrorMessage>
            </div>
        </div>
    );
};

export function SelectField(props) {
    const dispatch = useDispatch();

    const [GetSICCodes] = useLazyGetSICCodesQuery();
    const [GetCities] = useLazyGetCitiesQuery();
    const [GetZipCodes] = useLazyGetZipCodesQuery();

    const { setFieldValue } = useFormikContext();

    const onChange = async (e, option) => {
        if (option === 'SICCodes1') {
            if (e.target.value !== '-') await GetSICCodes({ groupOfSICCodesId: e.target.value }).then(d => dispatch(setSICCodes1(d.data)));
            else dispatch(setSICCodes1([]));
            setFieldValue('SICCode1Id', undefined);
        }

        else if (option === 'SICCodes2') {
            if (e.target.value !== '-') await GetSICCodes({ groupOfSICCodesId: e.target.value }).then(d => dispatch(setSICCodes2(d.data)));
            else dispatch(setSICCodes2([]));
            setFieldValue('SICCode2Id', undefined);
        }

        else if (option === 'SICCodes3') {
            if (e.target.value !== '-') await GetSICCodes({ groupOfSICCodesId: e.target.value }).then(d => dispatch(setSICCodes3(d.data)));
            else dispatch(setSICCodes3([]));
            setFieldValue('SICCode3Id', undefined);
        }

        else if (option === 'SICCodes4') {
            if (e.target.value !== '-') await GetSICCodes({ groupOfSICCodesId: e.target.value }).then(d => dispatch(setSICCodes4(d.data)));
            else dispatch(setSICCodes4([]));
            setFieldValue('SICCode4Id', undefined);
        }

        else if (option === 'SICCodesReports') {
            if (e.target.value !== '-') await GetSICCodes({ groupOfSICCodesId: e.target.value }).then(d => dispatch(setSICCodesReports(d.data)));
            else dispatch(setSICCodesReports([]));
            setFieldValue('SICCodeReportsId', undefined);
        }

        else if (option === 'citiesOfStateBusiness') {
            if (e.target.value !== '-') await GetCities({ stateId: e.target.value }).then(d => dispatch(setCitiesOfStateBusiness(d.data)));
            else {
                dispatch(setCitiesOfStateBusiness([]));
                dispatch(setZipCodesOfCityBusiness([]));
            }
            setFieldValue('businessCityId', undefined);
            setFieldValue('businessZipCodeId', undefined);
        }

        else if (option === 'zipCodesOfCityBusiness') {
            if (e.target.value !== '-') await GetZipCodes({ cityId: e.target.value }).then(d => dispatch(setZipCodesOfCityBusiness(d.data)));
            else dispatch(setZipCodesOfCityBusiness([]));
            setFieldValue('businessZipCodeId', undefined);
        }

        else if (option === 'citiesOfStateMailing') {
            if (e.target.value !== '-') await GetCities({ stateId: e.target.value }).then(d => dispatch(setCitiesOfStateMailing(d.data)));
            else {
                dispatch(setCitiesOfStateMailing([]));
                dispatch(setZipCodesOfCityMailing([]));
            }
            setFieldValue('mailingCityId', undefined);
            setFieldValue('mailingZipCodeId', undefined);
        }

        else if (option === 'zipCodesOfCityMailing') {
            if (e.target.value !== '-') await GetZipCodes({ cityId: e.target.value }).then(d => dispatch(setZipCodesOfCityMailing(d.data)));
            else dispatch(setZipCodesOfCityMailing([]));
            setFieldValue('mailingZipCodeId', undefined);
        }

        else if (option === 'cities1') {
            if (e.target.value !== '-') await GetCities({ stateId: e.target.value }).then(d => dispatch(setCities1(d.data)));
            else {
                dispatch(setCities1([]));
                dispatch(setZipCodes1([]));
            }
            setFieldValue('city1Id', undefined);
            setFieldValue('zipCode1Id', undefined);
        }

        else if (option === 'zipCodes1') {
            if (e.target.value !== '-') await GetZipCodes({ cityId: e.target.value }).then(d => dispatch(setZipCodes1(d.data)));
            else dispatch(setZipCodes1([]));
            setFieldValue('zipCode1Id', undefined);
        }

        else if (option === 'cities2') {
            if (e.target.value !== '-') await GetCities({ stateId: e.target.value }).then(d => dispatch(setCities2(d.data)));
            else {
                dispatch(setCities2([]));
                dispatch(setZipCodes2([]));
            }
            setFieldValue('city2Id', undefined);
            setFieldValue('zipCode2Id', undefined);
        }

        else if (option === 'zipCodes2') {
            if (e.target.value !== '-') await GetZipCodes({ cityId: e.target.value }).then(d => dispatch(setZipCodes2(d.data)));
            else dispatch(setZipCodes2([]));
            setFieldValue('zipCode2Id', undefined);
        }

        else if (option === 'cities3') {
            if (e.target.value !== '-') await GetCities({ stateId: e.target.value }).then(d => dispatch(setCities3(d.data)));
            else {
                dispatch(setCities3([]));
                dispatch(setZipCodes3([]));
            }
            setFieldValue('city3Id', undefined);
            setFieldValue('zipCode3Id', undefined);
        }

        else if (option === 'zipCodes3') {
            if (e.target.value !== '-') await GetZipCodes({ cityId: e.target.value }).then(d => dispatch(setZipCodes3(d.data)));
            else dispatch(setZipCodes3([]));
            setFieldValue('zipCode3Id', undefined);
        }

        else if (option === 'cities4') {
            if (e.target.value !== '-') await GetCities({ stateId: e.target.value }).then(d => dispatch(setCities4(d.data)));
            else {
                dispatch(setCities4([]));
                dispatch(setZipCodes4([]));
            }
            setFieldValue('city4Id', undefined);
            setFieldValue('zipCode4Id', undefined);
        }

        else if (option === 'zipCodes4') {
            if (e.target.value !== '-') await GetZipCodes({ cityId: e.target.value }).then(d => dispatch(setZipCodes4(d.data)));
            else dispatch(setZipCodes4([]));
            setFieldValue('zipCode4Id', undefined);
        }

        else if (option === 'priorOwnerCities') {
            if (e.target.value !== '-') await GetCities({ stateId: e.target.value }).then(d => dispatch(setPriorOwnerCities(d.data)));
            else {
                dispatch(setPriorOwnerCities([]));
                dispatch(setPriorOwnerZipCodes([]));
            }
            setFieldValue('priorOwnerCityId', undefined);
            setFieldValue('priorOwnerZipCodeId', undefined);
        }

        else if (option === 'priorOwnerZipCodes') {
            if (e.target.value !== '-') await GetZipCodes({ cityId: e.target.value }).then(d => dispatch(setPriorOwnerZipCodes(d.data)));
            else dispatch(setPriorOwnerZipCodes([]));
            setFieldValue('priorOwnerZipCodeId', undefined);
        }
    };

    return (
        <div className={`field ${props.class1}`}>
            <label className={props.class2}>{props.label}</label>
            <div className='w-full relative'>
                <Field
                    as='select'
                    name={props.name}
                    onChange={(e) => { onChange(e, props.options[1]); setFieldValue(props.name, e.target.value); }}
                >
                    <option key='-' value='-'>-</option>
                    {props.options[0].map(i => <option key={Math.random().toString()} value={i.id}>{i.name}</option>)}
                </Field>
                <ErrorMessage name={props.name}>{msg => <p className='active absolute'>{msg}</p>}</ErrorMessage>
            </div>
        </div>
    );
};

export function CheckField(props) {
    return (
        <div className='mr-[1vw]'>
            <div className='w-full relative'>
                <Field type='checkbox' name={props.name} className='w-5 h-5' />
                <label className='ml-2'>{props.label}</label>
            </div>
            <ErrorMessage name={props.name}>{msg => <p className={`active absolute ${props.class3}`}>{msg}</p>}</ErrorMessage>
        </div>
    );
};

export function RadioGroup(props) {
    const { setFieldValue } = useFormikContext();
    return (
        <div className='field'>
            <label className={props.class2}>{props.label}</label>
            <div className='flex flex-wrap'>
                {props.options.map(i =>
                    <div key={Math.random().toString()}>
                        <Field
                            type='radio'
                            name={props.name}
                            value={i.id.toString()}
                            className='w-5 h-5'
                            onChange={(e) => { setFieldValue(props.name, e.target.value); setFieldValue(props.field1, ''); setFieldValue(props.field2, ''); }}
                        />
                        <label className='ml-2 mr-6'>{i.name}</label>
                    </div>
                )}
            </div>
            <ErrorMessage name={props.name}>{msg => <p className={'active absolute'}>{msg}</p>}</ErrorMessage>
        </div>
    );
};

export function ButtonField(props) {
    return (
        <div className='text-center'>
            <button className='button color_button' type='submit'>{props.name}</button>
        </div>
    );
};