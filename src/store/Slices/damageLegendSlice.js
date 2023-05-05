import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const GetRoute = createAsyncThunk("chartInfo", async (d) => {
  let start = d[0];
  let end = d[1];
  if (start && end) {
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62482d8246fe91fc4aefb85d4a6e9b73e86b&start=${start[1]},${start[0]}&end=${end[1]},${end[0]}`;
    let res = await fetch(url);
    let da = await res.json();
    return da;
  }
});
export const PoliceStationGetAsyncThunk = createAsyncThunk(
  "policeStationInfrastructure",
  async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/api/v1/analysis/amenites/?tag=police"
    );
    const data = await response.json();
    return data;
  }
);
export const HospitalGetAsyncThunk = createAsyncThunk(
  "HospitalInfrastructure",
  async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/api/v1/analysis/amenites/?tag=hospital"
    );
    const data = await response.json();
    return data;
  }
);
export const FireStationGetAsyncThunk = createAsyncThunk(
  "FireStationInfrastructure",
  async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/api/v1/analysis/amenites/?tag=fire_station"
    );
    const data = await response.json();
    return data;
  }
);

const initialState = {
  fireStation: null,
  hospital: null,
  policeStation: null,
  legendItem: "incident",
  selectedInfrastructure: "",
  currentroute: null,
  startlocation: null,
  endlocation: null,
};

const DamageLegendSlice = createSlice({
  name: "slidebar",
  initialState,
  reducers: {
    changeLegendItem(state, action) {
      state.legendItem = action.payload;
    },
    setroute(state, action) {
      state.currentroute = action.payload;
    },
    setStartLocation(state, action) {
      state.startlocation = action.payload;
    },
    setDestinationLocation(state, action) {
      state.endlocation = action.payload;
    },
    setSelectedInfrastructure(state, action) {
      state.selectedInfrastructure = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(GetRoute.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentroute = action.payload;
      })
      .addCase(PoliceStationGetAsyncThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.policeStation = action.payload;
      })
      .addCase(HospitalGetAsyncThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.hospital = action.payload;
      })
      .addCase(FireStationGetAsyncThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.fireStation = action.payload;
      });
  },
});
export const {
  slidebarAction,
  setroute,
  setStartLocation,
  setDestinationLocation,
  setSelectedInfrastructure,
} = DamageLegendSlice.actions;
export default DamageLegendSlice.reducer;
