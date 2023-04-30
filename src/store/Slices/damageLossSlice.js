import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const DamageLossAsyncGETThunk = createAsyncThunk(
  "damageLossGet",
  async (date) => {
    let data;
    if (date) {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/disaster/disasterEventwithoutgeom/?name=&Ward=&type=&is_closed=&startTime__gte=${date[0]}T12%3A55%3A00Z&startTime__gt=&startTime=&startTime__lte=${date[1]}T14%3A51%3A00Z`
      );
      data = await response.json();
    } else {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/spatial/ward/`
      );
      data = await response.json();
    }
    return data;
  }
);

const initialState = {
  totalIncident: 0,
  totalPeopledeath: 0,
  totalEstimatedLoss: 0,
  totalInfrastructure: 0,
  status: "idle",
  error: null,
};

export const damageLossSlice = createSlice({
  name: "damageLoss",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(DamageLossAsyncGETThunk.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(DamageLossAsyncGETThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload, "action payload");
        state.totalIncident = action.payload.features.reduce((sum, event) => {
          return sum + event.properties.number_of_disasters;
        }, 0);
        state.totalPeopledeath = action.payload.features.reduce(
          (sum, event) => sum + event.properties.total_people_death,
          0
        );
        state.totalEstimatedLoss = action.payload.features.reduce(
          (sum, event) => sum + event.properties.total_estimated_loss,
          0
        );
        state.totalInfrastructure = action.payload.features.reduce(
          (sum, event) => sum + event.properties.total_infrastructure_damaged,
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
