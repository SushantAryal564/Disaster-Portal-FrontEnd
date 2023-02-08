import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const initialState = {
  legendItem: "incident",
};
const DamageLegendSlice = createSlice({
  name: "slidebar",
  initialState,
  reducers: {
    changeLegendItem(state, action) {
      state.legendItem = action.payload;
    },
  },
});
export const slidebarAction = DamageLegendSlice.actions;
export default DamageLegendSlice.reducer;
