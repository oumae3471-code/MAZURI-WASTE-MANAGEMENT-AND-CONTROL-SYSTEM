import { configureStore } from '@reduxjs/toolkit';
import collectionReducer from './collectionSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    collections: collectionReducer,
    auth: authReducer,
  }
});

export default store;
