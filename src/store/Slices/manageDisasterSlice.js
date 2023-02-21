import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const GetManageDisasterWardShpGETThunk = createAsyncThunk(
  "manageDisasterWardShpGet",
  async (wardId) => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/spatial/ward/${wardId}/`
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
export const manageDisasterSlice = createSlice({
  name: "manageDisaster",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(GetManageDisasterWardShpGETThunk.pending, (state, action) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(GetManageDisasterWardShpGETThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = [action.payload];
      })
      .addCase(GetManageDisasterWardShpGETThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default manageDisasterSlice.reducer;
