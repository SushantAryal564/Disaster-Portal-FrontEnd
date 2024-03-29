import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const buildingAsyncGETThunk = createAsyncThunk(
  "buildingGetThunk",
  async (wardID) => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/analysis/allbuilding/?ward=${wardID}`
    );
    const data = await response.json();
    return data;
  }
);

export const singlebuidlingThunk = createAsyncThunk(
  "singlebuildingGetThunk",
  async (osm) => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/analysis/singlebuilding/?id=${osm}`
    );
    const data = await response.json();
    return data;
  }
);

const initialState = {
  allbuilding: null,
  selectedbuildingfromAPI:null,
  selectedBuilding: null,
  isSelected: false,
  editedpolgonwkt:null,
  status: "idle",
  error: null,

};
export const buildingSlice = createSlice({
  name: "buildings",
  initialState,
  reducers: {
    addbuilding(state, action) {
      state.selectedBuilding = action.payload;
    },
    removebuilding(state, action) {
      state.selectedBuilding = null;
    },
    removeAPIbuilding(state, action) {
      state.selectedbuildingfromAPI = null;
    },
    setwkt(state, action) {
      state.editedpolgonwkt = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(buildingAsyncGETThunk.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(buildingAsyncGETThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allbuilding = action.payload;
      })
      .addCase(buildingAsyncGETThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      }) .addCase( singlebuidlingThunk.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(singlebuidlingThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedbuildingfromAPI = action.payload;
      })
      .addCase( singlebuidlingThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { addbuilding, removebuilding ,removeAPIbuilding,setwkt} = buildingSlice.actions;
export default buildingSlice.reducer;
