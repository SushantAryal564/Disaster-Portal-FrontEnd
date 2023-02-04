import { createSlice } from "@reduxjs/toolkit";
import { DASHBOARD } from "./../../store/constant";
let initialState = {
  type: "",
  data: [],
};
const DamageLossSlice = createSlice({
  name: "",
  initialState,
  reducers: {},
});

export const { setComponent } = DamageLossSlice.actions;

export default DamageLossSlice.reducer;
