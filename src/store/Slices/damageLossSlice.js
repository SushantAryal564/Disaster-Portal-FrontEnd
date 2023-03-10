import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const DamageLossAsyncGETThunk = createAsyncThunk(
  "damageLossGet",
  async (startdate, enddate) => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/disaster/disasterEventwithoutgeom/?name=&Ward=$&type=&is_closed=&startTime__gte=${startdate}T18%3A00%3A00Z&startTime__gt=&startTime=&startTime__lte=${enddate}T18%3A00%3A00Z`
    );
    const data = await response.json();
    return data;
  }
);

const initialState = {
  data: [],
  totalIncident: 0,
  totalPeopledeath: 0,
  totalEstimatedLoss: 0,
  totalInfrastructure: 0,
  status: "idle",
  error: null,
};

export const damageLossSlice = createSlice({
  name: "disasterIncident",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(DamageLossAsyncGETThunk.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(DamageLossAsyncGETThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = state.data.concat(action.payload);
        state.totalIncident = state.data.reduce(
          (sum, event) => sum + event.Ward.number_of_disasters,
          0
        );
        state.totalPeopledeath = state.data.reduce(
          (sum, event) => sum + event.Ward.total_people_death,
          0
        );
        state.totalEstimatedLoss = state.data.reduce(
          (sum, event) => sum + event.Ward.total_estimated_loss,
          0
        );
        state.totalInfrastructure = state.data.reduce(
          (sum, event) => sum + event.Ward.total_infrastructure_damaged,
          0
        );
      })
      .addCase(DamageLossAsyncGETThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default damageLossSlice.reducer;
