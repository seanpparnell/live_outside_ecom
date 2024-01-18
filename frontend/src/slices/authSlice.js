import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload))
    },
    logoutCredentials: (state) => {
      state.userInfo = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('token');
    },
  }
});

export const {setCredentials, loginSuccess, logoutSuccess} = authSlice.actions

export default authSlice.reducer;