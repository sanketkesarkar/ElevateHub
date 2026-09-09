import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';

const preloadedState = {
  auth: {
    isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false,
    role: localStorage.getItem('role') || null,
    userId: localStorage.getItem('userId') || null,
  },
};

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState, 
});

export default store;
