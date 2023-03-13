import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentpanel: 1,
  criticalInfrastructureToggle: false,
  amenitiesToggle: true,
};
export const riskinfoSlice = createSlice({
  name: "riskinfo",
  initialState,
  reducers: {
    setpanel: (state, action) => {
      state.currentpanel = action.payload;
    },
    setbuldingToggle: (state, action) => {
      state.crticalInfraBuindingToggle = !state.crticalInfraBuindingToggle;
    },
    setamenitiesToggle: (state, action) => {
      state.amenitiesToggle = !state.amenitiesToggle;
    },
  },
});

export const { setpanel, setbuldingToggle, setamenitiesToggle } =
  riskinfoSlice.actions;
export default riskinfoSlice.reducer;
