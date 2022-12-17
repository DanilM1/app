import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api';
import data from './data';

export const store = configureStore({
  reducer: {
    data,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production'
});