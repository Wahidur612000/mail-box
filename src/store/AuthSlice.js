import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: localStorage.getItem('login'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      localStorage.removeItem('login');
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
