import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const InfrastructureAsyncGETThunk = createAsyncThunk(
  "InfrastructureGet",
  async (infrastructure) => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/analysis/amenites/?tag=${infrastructure}`
    );
    const data = await response.json();
    return data;
  }
);

const initialState = {
  currentpanel: 1,
  data: [],
  status: "idle",
  error: null,
};
export const riskinfoSlice = createSlice({
  name: "riskinfo",
  initialState,
  reducers: {
    setpanel: (state, action) => {
      state.currentpanel = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(InfrastructureAsyncGETThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(InfrastructureAsyncGETThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(InfrastructureAsyncGETThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setpanel, setbuldingToggle, setamenitiesToggle } =
  riskinfoSlice.actions;
export default riskinfoSlice.reducer;
