import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const disasterAsyncGETThunk = createAsyncThunk("disaster", async () => {
  const response = await fetch(
    "http://127.0.0.1:8000/api/v1/disaster/disasterEvent/"
  );
  return await response.json();
});

export const disasterAsyncPostThunk = createAsyncThunk("disaster", async () => {
  const response = await fetch(
    "http://127.0.0.1:8000/api/v1/disaster/disasterEvent/",
    {
      method: "POST",
      body: JSON.stringify({
        name: "lalitpur Disaster",
        lat: 27.6588,
        lng: 85.3247,
      }),
    }
  );
  return await response.json();
});

const initialState = {
  data: [],
  status: "idle",
  error: null,
};
export const disasterSlice = createSlice({
  name: "disaster",
  initialState,
  reducers: {},
  extraReducer: (builder) => {
    builder
      .addCase(disasterAsyncGETThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(disasterAsyncGETThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data += action.paylod;
      })
      .addCase(disasterAsyncGETThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(disasterAsyncPostThunk.fulfilled, (state, action) => {
        state.data.push(action.paylod);
      });
  },
});
export default disasterSlice.reducer;
