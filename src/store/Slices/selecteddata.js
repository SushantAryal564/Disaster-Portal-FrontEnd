import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  selectedMarkerId: null,
};

const markerSlice = createSlice({
  name: "selected",
  initialState,
  reducers: { 
      selectMarker: (state, action) => {
      state.selectedMarkerId = action.payload;
    },
  }, 
});

export const { selectMarker } = markerSlice.actions;
export default markerSlice.reducer;