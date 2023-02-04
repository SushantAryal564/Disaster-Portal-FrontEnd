import { createSlice } from "@reduxjs/toolkit";
import { DASHBOARD } from "./../../store/constant";
const componentSlice = createSlice({
  name: "component",
  initialState: DASHBOARD,
  reducers: {
    setComponent: (state, action) => {
      return action.payload;
    },
  },
});

export const { setComponent } = componentSlice.actions;

export default componentSlice.reducer;
