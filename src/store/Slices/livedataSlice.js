import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const LivePollutionDataAsyncGETThunk = createAsyncThunk(
  "pollutionget",
  async () => {
    const response = await fetch(
      "https://bipaddev.yilab.org.np/api/v1/pollution-stations/?name=&created_on__lt=&created_on__gt=&date_time__lt=&date_time__gt=&ward=&municipality=25004&district=&province="
    );
    const data = await response.json();
    return data;
  }
);
export const WaterDataAsyncGETThunk = createAsyncThunk("waterget", async () => {
  const response = await fetch(
    "https://bipaddev.yilab.org.np/api/v1/river-stations/?status__iexact=&water_level__gt=&water_level__lt=&water_level_on__gt=&water_level_on__lt=&title=&station_series_id=&ward=&municipality=25004&district=28&province="
  );
  const data = await response.json();
  return data;
});
const initialState = {
  water: [],
  pollution: [],
  status: "idle",
  error: null,
};
export const LiveSlice = createSlice({
  name: "live",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(LivePollutionDataAsyncGETThunk.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(LivePollutionDataAsyncGETThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pollution = state.pollution.concat(action.payload);
      })
      .addCase(LivePollutionDataAsyncGETThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(WaterDataAsyncGETThunk.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(WaterDataAsyncGETThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.water = state.water.concat(action.payload);
      })
      .addCase(WaterDataAsyncGETThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default LiveSlice.reducer;
