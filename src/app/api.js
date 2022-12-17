import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    reducerPath: 'apiSlice',
    baseUrl: process.env.REACT_APP_BASEURL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().data.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    }
  }),

  endpoints: (builder) => ({
    GetAllRoles: builder.query({
      query: () => {
        return {
          url: '/C_Roles'
        };
      }
    }),

    SignUp: builder.mutation({
      query: (payload) => ({
        url: '/C_Users/SignUp',
        method: 'POST',
        body: payload
      })
    }),

    SignIn: builder.mutation({
      query: (payload) => ({
        url: '/C_Users/SignIn',
        method: 'POST',
        body: payload
      })
    }),

    GetBusinessLicensesFilterDates: builder.query({
      query: (arg) => {
        const { startEffectiveDate, cancelEffectiveDate } = arg;
        return {
          url: '/C_BusinessLicensesFilterDates',
          params: { startEffectiveDate, cancelEffectiveDate }
        };
      }
    }),

    GetAllBusinessLicenses: builder.query({
      query: () => {
        return {
          url: '/C_BusinessLicenses'
        };
      }
    }),

    GetAllGroupsOfSICCodes: builder.query({
      query: () => {
        return {
          url: '/C_GroupsOfSICCodes',
        };
      }
    }),

    GetSICCodes: builder.query({
      query: (arg) => {
        const { groupOfSICCodesId } = arg;
        return {
          url: '/C_SICCodes',
          params: { groupOfSICCodesId }
        };
      }
    }),

    GetBusinessLicensesFilterSICCode: builder.query({
      query: (arg) => {
        const { groupOfSICCodesId, SICCodeId } = arg;
        return {
          url: '/C_BusinessLicensesFilterSICCode',
          params: { groupOfSICCodesId, SICCodeId }
        };
      }
    }),

    GetAllStatesUS: builder.query({
      query: () => {
        return {
          url: '/C_StatesUS'
        };
      }
    }),

    GetCities: builder.query({
      query: (arg) => {
        const { stateId } = arg;
        return {
          url: '/C_Cities',
          params: { stateId }
        };
      }
    }),

    GetZipCodes: builder.query({
      query: (arg) => {
        const { cityId } = arg;
        return {
          url: '/C_ZipCodes',
          params: { cityId }
        };
      }
    }),

    AddNewBusinessLicense: builder.mutation({
      query: (payload) => ({
        url: '/C_BusinessLicense/RegistrationStep1',
        method: 'POST',
        body: payload
      })
    }),

    UpdateBusinessLicenseStep2: builder.mutation({
      query: (payload) => ({
        url: '/C_BusinessLicense/RegistrationStep2',
        method: 'PUT',
        body: payload
      })
    }),

    UpdateBusinessLicenseStep3: builder.mutation({
      query: (payload) => ({
        url: '/C_BusinessLicense/RegistrationStep3',
        method: 'PUT',
        body: payload
      })
    }),

    UpdateBusinessLicenseStep4: builder.mutation({
      query: (payload) => ({
        url: '/C_BusinessLicense/RegistrationStep4',
        method: 'PUT',
        body: payload
      })
    }),

    UpdateBusinessLicenseStep5: builder.mutation({
      query: (payload) => ({
        url: '/C_BusinessLicense/RegistrationStep5',
        method: 'PUT',
        body: payload
      })
    })
  })
});

export const {
  useGetAllRolesQuery,
  useSignUpMutation,
  useSignInMutation,
  useLazyGetBusinessLicensesFilterDatesQuery,
  useGetAllBusinessLicensesQuery,
  useGetAllGroupsOfSICCodesQuery,
  useLazyGetSICCodesQuery,
  useLazyGetBusinessLicensesFilterSICCodeQuery,
  useGetAllStatesUSQuery,
  useLazyGetCitiesQuery,
  useLazyGetZipCodesQuery,
  useAddNewBusinessLicenseMutation,
  useUpdateBusinessLicenseStep2Mutation,
  useUpdateBusinessLicenseStep3Mutation,
  useUpdateBusinessLicenseStep4Mutation,
  useUpdateBusinessLicenseStep5Mutation
} = apiSlice;