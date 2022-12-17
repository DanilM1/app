import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: '',
    time: 7000,
    active: 'home',
    page: 'Home',
    step: 1,
    role: 0,
    roles: [],

    groupsOfSICCodes: [],
    SICCodes1: [],
    SICCodes2: [],
    SICCodes3: [],
    SICCodes4: [],
    SICCodesReports: [],

    statesUS: [],

    citiesOfStateBusiness: [],
    zipCodesOfCityBusiness: [],
    citiesOfStateMailing: [],
    zipCodesOfCityMailing: [],

    cities1: [],
    zipCodes1: [],
    cities2: [],
    zipCodes2: [],
    cities3: [],
    zipCodes3: [],
    cities4: [],
    zipCodes4: [],
    priorOwnerCities: [],
    priorOwnerZipCodes: [],

    imagesOfApp: {
        img1: 'https://i.ibb.co/NmX6QKc/BG.jpg',
        img2: 'https://i.ibb.co/0mYdysf/decor.jpg',
        img3: 'https://i.ibb.co/72y2MWg/bizon.png'
    },

    headersOfTables: {
        report: [
            {
                Header: 'Vendor Name',
                accessor: 'username'
            },
            {
                Header: 'License #',
                accessor: 'license'
            },
            {
                Header: 'Application Date',
                accessor: 'startEffectiveDate'
            },
            {
                Header: 'End Date',
                accessor: 'cancelEffectiveDate'
            },
            {
                Header: 'First Name',
                accessor: 'firstName'
            },
            {
                Header: 'Last Name',
                accessor: 'lastName'
            },
            {
                Header: 'Address',
                accessor: 'businessAddress'
            },
            {
                Header: 'City',
                accessor: 'businessCity'
            },
            {
                Header: 'State',
                accessor: 'businessState'
            },
            {
                Header: 'Day Time Phone',
                accessor: 'dayTimePhone'
            },
            {
                Header: 'Mailing Address',
                accessor: 'mailingAddress'
            },
            {
                Header: 'Zip Code',
                accessor: 'businessZipCode'
            }
        ]
    },
};

const data = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setActive: (state, action) => {
            state.active = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setStep: (state, action) => {
            state.step = action.payload;
        },
        setRole: (state, action) => {
            state.role = action.payload;
        },
        setRoles: (state, action) => {
            state.roles = action.payload;
        },
        setGroupsOfSICCodes: (state, action) => {
            state.groupsOfSICCodes = action.payload;
        },
        setSICCodes1: (state, action) => {
            state.SICCodes1 = action.payload;
        },
        setSICCodes2: (state, action) => {
            state.SICCodes2 = action.payload;
        },
        setSICCodes3: (state, action) => {
            state.SICCodes3 = action.payload;
        },
        setSICCodes4: (state, action) => {
            state.SICCodes4 = action.payload;
        },
        setSICCodesReports: (state, action) => {
            state.SICCodesReports = action.payload;
        },
        setStatesUS: (state, action) => {
            state.statesUS = action.payload;
        },
        setCitiesOfStateBusiness: (state, action) => {
            state.citiesOfStateBusiness = action.payload;
        },
        setZipCodesOfCityBusiness: (state, action) => {
            state.zipCodesOfCityBusiness = action.payload;
        },
        setCitiesOfStateMailing: (state, action) => {
            state.citiesOfStateMailing = action.payload;
        },
        setZipCodesOfCityMailing: (state, action) => {
            state.zipCodesOfCityMailing = action.payload;
        },
        setCities1: (state, action) => {
            state.cities1 = action.payload;
        },
        setZipCodes1: (state, action) => {
            state.zipCodes1 = action.payload;
        },
        setCities2: (state, action) => {
            state.cities2 = action.payload;
        },
        setZipCodes2: (state, action) => {
            state.zipCodes2 = action.payload;
        },
        setCities3: (state, action) => {
            state.cities3 = action.payload;
        },
        setZipCodes3: (state, action) => {
            state.zipCodes3 = action.payload;
        },
        setCities4: (state, action) => {
            state.cities4 = action.payload;
        },
        setZipCodes4: (state, action) => {
            state.zipCodes4 = action.payload;
        },
        setPriorOwnerCities: (state, action) => {
            state.priorOwnerCities = action.payload;
        },
        setPriorOwnerZipCodes: (state, action) => {
            state.priorOwnerZipCodes = action.payload;
        }
    }
});

const { actions, reducer } = data;

export default reducer;
export const {
    setToken,
    setActive,
    setPage,
    setStep,
    setRole,
    setRoles,
    setGroupsOfSICCodes,
    setStatesUS,
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
} = actions;