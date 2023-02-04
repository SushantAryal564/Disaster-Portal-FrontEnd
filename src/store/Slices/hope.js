import { createSlice } from "@reduxjs/toolkit";

const componentSlice = createSlice({
  name: "component",
  initialState: "Daddashboard",
  reducers: {
    setComponent: (state, action) => {
      return action.payload;
    },
  },
});

export const { setComponent } = componentSlice.actions;

export default componentSlice.reducer;
