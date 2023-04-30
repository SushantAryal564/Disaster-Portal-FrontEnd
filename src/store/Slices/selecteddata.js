import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const getWarddownloadbuilding = createAsyncThunk(
  "manageDisasterWardShpGet",
  async (wardId) => {
    console.log("RUNNING THUNK ................................",`http://127.0.0.1:8000/api/v1/spatial/ward/${wardId}/`)
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/spatial/ward/${wardId}/`
    );
    const data = await response.json();
    return data;
  }
);
export const getdateselectedEvents = createAsyncThunk(
  "getdateselectedEvents",
  async (date) => {
    let startDate=date[0]
    let endDate=date[1]
    console.log(`http://127.0.0.1:8000/api/v1/disaster/disasterEventwithoutgeom/?name=&type=&is_closed=false&startTime__gte=${startDate}T18%3A00%3A00Z&startTime__gt=&startTime=&startTime__lte=${endDate}T18%3A00%3A00Z`,'HUNKKK')
const response = await fetch(
  `http://127.0.0.1:8000/api/v1/disaster/disasterEventwithoutgeom/?name=&type=&is_closed=false&startTime__gte=${startDate}T18%3A00%3A00Z&startTime__gt=&startTime=&startTime__lte=${endDate}T18%3A00%3A00Z`
);
const data = await response.json()
console.log("THUNK dta----------------",)
return data

  });

const initialState = {
  selectedMarkerId: null,
  selectionDownloadWardbuilding:null,
  dateselectedevent:null
};

const markerSlice = createSlice({
  name: "selected",
  initialState,
  reducers: { 
      selectMarker: (state, action) => {
      state.selectedMarkerId = action.payload;
    },
    clearWard: (state, action) => {
      state.selectionDownloadWardbuilding = null;
    },
    cleardData:(state, action) => {
      state.dateselectedevent = null;
    },

  }, 
  extraReducers(builder) {
    builder
      .addCase(getWarddownloadbuilding.pending, (state, action) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(getWarddownloadbuilding.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectionDownloadWardbuilding = action.payload;
      })
      .addCase(getWarddownloadbuilding.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      }).addCase(getdateselectedEvents.pending, (state, action) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(getdateselectedEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dateselectedevent = action.payload;
      })
      .addCase(getdateselectedEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { selectMarker ,clearWard,cleardData} = markerSlice.actions;
export default markerSlice.reducer;