import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const initialState = {
  slidebarState: true,
};
const slidebarSlice = createSlice({
  name: "slidebar",
  initialState,
  reducers: {
    changeSlidebarState(state) {
      state.slidebarState = !state.slidebarState;
    },
  },
});
export const slidebarAction = slidebarSlice.actions;
export default slidebarSlice.reducer;
