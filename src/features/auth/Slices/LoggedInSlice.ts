import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isLogin: boolean;
}

const initialState: AuthState = {
  isLogin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isLogin = true;
    },
    logout: (state) => {
      state.isLogin = false;
    },
    toggleLogin: (state) => {
      state.isLogin = !state.isLogin;
    },
  },
});

export const { login, logout, toggleLogin } = authSlice.actions;
export default authSlice.reducer;
