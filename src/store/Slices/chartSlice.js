import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const GetChartDashboardInfo = createAsyncThunk("chartInfo", async () => {
  const response = await fetch(
    "http://127.0.0.1:8000/api/v1/spatial/chartward/"
  );
  const data = await response.json();
  return data;
});

const initialState = {
  data: [],
  status: "idle",
  tab: "incident",
  error: null,
};
export const chartSlice = createSlice({
  name: "disasterIncident",
  initialState,
  reducers: {
    changeDamageAndLossTab: (state, action) => {
      state.tab = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(GetChartDashboardInfo.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(GetChartDashboardInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = state.data.concat(action.payload);
      })
      .addCase(GetChartDashboardInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { changeDamageAndLossTab } = chartSlice.actions;
export default chartSlice.reducer;
