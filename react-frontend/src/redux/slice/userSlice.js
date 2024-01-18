import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "hardcodedJoe",
  isAuthenticated: false,
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthenticationStatus: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setAuthenticationStatus, setUserName, setToken } = userSlice.actions;

export default userSlice.reducer;
