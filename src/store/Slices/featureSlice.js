import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const GetBuildingWithInBuffer = createAsyncThunk(
  "GetBuildingWithInBuffer",
  async (latlng) => {
    const bufferd = latlng[2];
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/analysis/building/?lat=${latlng[0]}&lon=${
        latlng[1]
      }&buffer_distance=${+bufferd}`
    );
    const data = await response.json();
    return data;
  }
);
export const GetForestWithInBuffer = createAsyncThunk(
  "GetForestWithInBuffer",
  async (latlng) => {
    const bufferd = latlng[2];
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/analysis/forest/?lat=${latlng[0]}&lon=${latlng[1]}&buffer_distance=${bufferd}`
    );
    const data = await response.json();
    return data;
  }
);
export const GetWaterbodyWithInBuffer = createAsyncThunk(
  "GetWaterbodyWithInBuffer",
  async (latlng) => {
    const bufferd = latlng[2];
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/analysis/waterbody/?lat=${latlng[0]}&lon=${latlng[1]}&buffer_distance=${bufferd}`
    );
    const data = await response.json();
    return data;
  }
);
export const GetAmenitiesWithInBuffer = createAsyncThunk(
  "GetAmenitiesWithInBuffer",
  async (latlng) => {
    const bufferd = latlng[2];
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/analysis/amenities/?lat=${latlng[0]}&lon=${latlng[1]}&buffer_distance=${bufferd}`
    );
    const data = await response.json();
    return data;
  }
);

const initialState = {
  building: [],
  forest: [],
  allfeature: [],
  waterbody: [],
  amenities: [],
  status: "idle",
  featureEachCount: [],
  error: null,
  bufferdistance: 100,
};
export const FeatureSlice = createSlice({
  name: "manageDisaster",
  initialState,
  reducers: {
    removeAll: (state) => {
      state.building = null;
      state.forest = null;
      state.waterbody = null;
      state.amenities = null;
      state.allfeature = [];
      state.featureEachCount = [];
    },
    setdistance: (state, action) => {
      state.bufferdistance = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(GetBuildingWithInBuffer.pending, (state, action) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(GetBuildingWithInBuffer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.building = [action.payload];
        state.allfeature = state.allfeature.concat([
          ...new Set(
            action.payload.features.map((feature) => feature.properties.classes)
          ),
        ]);
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
        state.allfeature = state.allfeature.concat([
          ...new Set(
            action.payload.features.map((feature) => feature.properties.classes)
          ),
        ]);
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
        state.allfeature = state.allfeature.concat([
          ...new Set(
            action.payload.features.map((feature) => feature.properties.classes)
          ),
        ]);
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
        state.allfeature = state.allfeature.concat([
          ...new Set(
            action.payload.features.map((feature) => feature.properties.classes)
          ),
        ]);
      })
      .addCase(GetWaterbodyWithInBuffer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { removeAll, setdistance } = FeatureSlice.actions;
export default FeatureSlice.reducer;
