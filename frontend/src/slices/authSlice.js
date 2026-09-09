


import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    role: null,
    userId: null,
  },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.role = action.payload.role;
      state.userId = action.payload.userId;
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('role', action.payload.role);
      localStorage.setItem('userId', action.payload.userId);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.role = null;
      state.userId = null;
      localStorage.clear();
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
