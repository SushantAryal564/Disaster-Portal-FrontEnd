import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const disasterIncidnetAsyncGETThunk = createAsyncThunk(
  "disasterIncidnetGet",
  async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/api/v1/disaster/disasterEvent/?name=&Ward=&type=&is_closed=false"
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
        state.data = state.data.concat(action.payload);
      })
      .addCase(disasterIncidnetAsyncGETThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default disasterSlice.reducer;
