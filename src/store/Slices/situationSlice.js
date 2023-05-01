import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const SituationGETAsyncThunk = createAsyncThunk(
  "Situation",
  async (infrastructure) => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/analysis/amenites/?tag=${infrastructure}`
    );
    const data = await response.json();
    return data;
  }
);

const initialState = {
  currentTab: "active",
  data: [],
  status: "idle",
};
export const situationSlice = createSlice({
  name: "riskinfo",
  initialState,
  reducers: {
    setpanel: (state, action) => {
      state.currentpanel = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(SituationGETAsyncThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(SituationGETAsyncThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(SituationGETAsyncThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setpanel } = situationSlice.actions;
export default situationSlice.reducer;
