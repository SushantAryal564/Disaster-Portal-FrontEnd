import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const disasterAsyncGETThunk = createAsyncThunk(
  "disasterget",
  async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/api/v1/disaster/disasterEvent/"
    );
    const data = await response.json();
    return data;
  }
);

export const disasterAsyncPostThunk = createAsyncThunk(
  "disasterpost",
  async () => {
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
  }
);

const initialState = {
  data: [],
  status: "idle",
  error: null,
};
export const disasterSlice = createSlice({
  name: "disaster",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(disasterAsyncGETThunk.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(disasterAsyncGETThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(disasterAsyncGETThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(disasterAsyncPostThunk.fulfilled, (state, action) => {
        state.data.push(action.payload);
      });
  },
});
export default disasterSlice.reducer;
