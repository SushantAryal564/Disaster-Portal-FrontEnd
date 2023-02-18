import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const GetBuildingWithInBuffer = createAsyncThunk(
  "GetBuildingWithInBuffer",
  async (latlng) => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/analysis/building/?lat=${latlng[1]}&lon=${latlng[0]}&buffer_distance=100`
    );
    const data = await response.json();
    return data;
  }
);
export const GetForestWithInBuffer = createAsyncThunk(
  "GetForestWithInBuffer",
  async (latlng) => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/analysis/forest/?lat=${latlng[1]}&lon=${latlng[0]}&buffer_distance=100`
    );
    const data = await response.json();
    return data;
  }
);
export const GetWaterbodyWithInBuffer = createAsyncThunk(
  "GetWaterbodyWithInBuffer",
  async (latlng) => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/analysis/waterbody/?lat=${latlng[1]}&lon=${latlng[0]}&buffer_distance=100`
    );
    const data = await response.json();
    return data;
  }
);
export const GetAmenitiesWithInBuffer = createAsyncThunk(
  "GetAmenitiesWithInBuffer",
  async (latlng) => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/analysis/amenities/?lat=${latlng[1]}&lon=${latlng[0]}&buffer_distance=100`
    );
    const data = await response.json();
    return data;
  }
);

const initialState = {
  building: [],
  forest: [],
  waterbody: [],
  amenities: [],
  status: "idle",
  error: null,
};
export const manageDisasterSlice = createSlice({
  name: "manageDisaster",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(GetBuildingWithInBuffer.pending, (state, action) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(GetBuildingWithInBuffer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.building = [action.payload];
      })
      .addCase(GetBuildingWithInBuffer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(GetAmenitiesWithInBuffer.pending, (state, action) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(GetAmenitiesWithInBuffer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.amenities = [action.payload];
      })
      .addCase(GetAmenitiesWithInBuffer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(GetForestWithInBuffer.pending, (state, action) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(GetForestWithInBuffer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.forest = [action.payload];
      })
      .addCase(GetForestWithInBuffer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(GetWaterbodyWithInBuffer.pending, (state, action) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(GetWaterbodyWithInBuffer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.waterbody = [action.payload];
      })
      .addCase(GetWaterbodyWithInBuffer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default manageDisasterSlice.reducer;
