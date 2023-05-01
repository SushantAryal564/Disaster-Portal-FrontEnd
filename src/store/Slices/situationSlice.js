import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const ActiveDisasterGETAsyncThunk = createAsyncThunk(
  "ActiveDisaster",
  async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/disaster/disasterEventwithoutgeom/?name=&Ward=&type=&is_closed=false&startTime__gte=&startTime__gt=&startTime=&startTime__lte=`
    );
    const data = await response.json();
    return data;
  }
);
export const AllDisasterGETAsyncThunk = createAsyncThunk(
  "AllDisaster",
  async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/api/v1/disaster/disasterEventwithoutgeom/"
    );
    const data = await response.json();
    return data;
  }
);
export const GETDisasterIncidentResponse = createAsyncThunk(
  "Response",
  async (disasterId) => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/response/activity/?disaster__is_closed=&disaster__id=${disasterId}&disaster__Ward=`
    );
    const data = await response.json();
    return data;
  }
);

const initialState = {
  allIncident: [],
  activeIncident: [],
  activityResponse: [],
  selectedDisaster: null,
  selectedPanel: "allIncident",
};
export const situationSlice = createSlice({
  name: "situationInfo",
  initialState,
  reducers: {
    setDisaster: (state, action) => {
      state.selectedDisaster = action.payload;
    },
    setPanel: (state, action) => {
      state.selectedPanel = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(ActiveDisasterGETAsyncThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.activeIncident = action.payload;
      })
      .addCase(AllDisasterGETAsyncThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allIncident = action.payload;
      })
      .addCase(GETDisasterIncidentResponse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.activityResponse = action.payload;
      });
  },
});

export const { setDisaster, setPanel } = situationSlice.actions;
export default situationSlice.reducer;
