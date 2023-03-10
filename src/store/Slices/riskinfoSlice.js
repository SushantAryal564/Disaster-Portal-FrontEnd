import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentpanel:'population'
};
export const riskinfoSlice = createSlice({
  name: "riskinfo",
  initialState,
  reducers: {
    setpanel: (state, action) => {
        state.currentpanel=action.payload
      },
  }, 
});

export const { setpanel } = riskinfoSlice.actions;
export default riskinfoSlice.reducer;