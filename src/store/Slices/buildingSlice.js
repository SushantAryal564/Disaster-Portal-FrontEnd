import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const BuildingAsyncGETThunk = createAsyncThunk(
  "disasterIncidnetGet",
  async (wardID) => {
    console.log(wardID);
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/analysis/allbuilding/?ward=${wardID}`
    );
    const data = await response.json();
    return data;
  }
);

const initialState = {
  allbuilding: [],
  selectedBuilding: null,
  status: "idle",
  error: null,
};
export const buildingSlice = createSlice({
  name: "disasterIncident",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(BuildingAsyncGETThunk.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(BuildingAsyncGETThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allbuilding = state.allbuilding.concat(action.payload);
      })
      .addCase(BuildingAsyncGETThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default buildingSlice.reducer;
