import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const disasterIncidnetAsyncGETThunk = createAsyncThunk(
  "disasterIncidnetGet",
  async (date) => {
    let startDate = date[0];
    let endDate = date[1];
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/disaster/disasterEventwithoutgeom/?name=&type=&is_closed=&startTime__gte=${startDate}T18%3A00%3A00Z&startTime__gt=&startTime=&startTime__lte=${endDate}T18%3A00%3A00Z`
    );
    const data = await response.json();
    return data;
  }
);

const initialState = {
  data: [],
  status: "idle",
  error: null,
};
export const disasterSlice = createSlice({
  name: "disasterIncident",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(disasterIncidnetAsyncGETThunk.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(disasterIncidnetAsyncGETThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(disasterIncidnetAsyncGETThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default disasterSlice.reducer;
