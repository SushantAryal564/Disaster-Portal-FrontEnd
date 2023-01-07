import { createSlice } from "@reduxjs/toolkit";
const initialState = { isLogged_In: false };
const AuthSlice = createSlice({
  name: "Authentication",
  initialState,
  reducers: {
    LoggedIn(state) {
      state.isLogged_In = false;
    },
    LoggedOut(state) {
      state.isLogged_In = true;
    },
  },
});
