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



const initialState = {
  selectedMarkerId: null,
  selectionDownloadWardbuilding:null
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
      });
  },
});

export const { selectMarker ,clearWard} = markerSlice.actions;
export default markerSlice.reducer;