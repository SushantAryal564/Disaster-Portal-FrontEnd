import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const DamageLossAsyncGETThunk = createAsyncThunk(
  "damageLossGet",
  async (startdate, enddate) => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/disaster/disasterEventwithoutgeom/?start_time=${startdate}T00:00:00&end_time=${enddate}T23:59:59`
    );
    const data = await response.json();
    return data;
  }
);

const initialState = {
  data: [],
  totalIncident: 0,
  status: "idle",
  error: null,
};

export const damageLossSlice = createSlice({
  name: "disasterIncident",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(DamageLossAsyncGETThunk.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(DamageLossAsyncGETThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = state.data.concat(action.payload);
        state.totalIncident = state.data.reduce(
          (sum, event) => sum + event.Ward.number_of_disasters,
          0
        );
      })
      .addCase(DamageLossAsyncGETThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default damageLossSlice.reducer;
