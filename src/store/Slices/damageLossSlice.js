import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { quantile } from "simple-statistics";

export const DamageLossAsyncGETThunk = createAsyncThunk(
  "damageLossGet",
  async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/v1/spatial/ward/`);
    const data = await response.json();
    return data;
  }
);

const initialState = {
  disasterData: [],
  LossData: [],
  PeopleDeathData: [],
  InfrastructureData: [],
  maxDisaster: null,
  minDisaster: null,
  maxPeopleDeath: null,
  minPeopleDeath: null,
  maxEstimatedLoss: null,
  minEstimatedLoss: null,
  maxInfrastructureDamage: null,
  minInfrastructureDamage: null,
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
        state.disasterData = action.payload?.features?.map(
          (feature) => feature.properties.number_of_disasters
        );
        state.LossData = action.payload?.features?.map(
          (feature) => feature.properties.total_estimated_loss
        );
        state.InfrastructureData = action.payload?.features?.map(
          (feature) => feature.properties.total_infrastructure_damaged
        );
        state.PeopleDeathData = action.payload?.features?.map(
          (feature) => feature.properties.total_people_death
        );
        state.maxDisaster = Math.max(
          ...action.payload?.features?.map(
            (item) => item.properties.number_of_disasters
          )
        );
        state.minDisaster = Math.min(
          ...action.payload?.features?.map(
            (item) => item.properties.number_of_disasters
          )
        );
        state.maxPeopleDeath = Math.max(
          ...action.payload?.features?.map(
            (item) => item.properties.total_people_death
          )
        );
        state.minPeopleDeath = Math.min(
          ...action.payload?.features?.map(
            (item) => item.properties.total_people_death
          )
        );
        state.maxEstimatedLoss = Math.max(
          ...action.payload?.features?.map(
            (item) => item.properties.total_estimated_loss
          )
        );
        state.minEstimatedLoss = Math.min(
          ...action.payload?.features?.map(
            (item) => item.properties.total_estimated_loss
          )
        );
        state.maxInfrastructureDamage = Math.max(
          ...action.payload?.features?.map(
            (item) => item.properties.total_infrastructure_damaged
          )
        );
        state.minInfrastructureDamage = Math.min(
          ...action.payload?.features?.map(
            (item) => item.properties.total_infrastructure_damaged
          )
        );

        // Disaster class
        const disasterClasses = [];
        const disasterDataSorted = state.disasterData
          .slice()
          .sort((a, b) => a - b);
        const disasterQuantiles = quantile(
          disasterDataSorted,
          [0, 0.25, 0.5, 0.75, 1]
        );
        for (let i = 0; i < disasterQuantiles.length - 1; i++) {
          disasterClasses.push({
            name: `Class ${i + 1}`,
            min: disasterQuantiles[i],
            max: disasterQuantiles[i + 1],
          });
        }
        state.disasterClasses = disasterClasses;

        // Loss Class
        const LossClass = [];
        const LossDataSorted = state.LossData.slice().sort((a, b) => a - b);
        const lossQuantiles = quantile(LossDataSorted, [0, 0.25, 0.5, 0.75, 1]);
        for (let i = 0; i < lossQuantiles.length - 1; i++) {
          LossClass.push({
            name: `Class ${i + 1}`,
            min: lossQuantiles[i],
            max: lossQuantiles[i + 1],
          });
        }
        state.LossClass = LossClass;

        // PeopleDeath Class
        const PeopleDeathClass = [];
        const PeopleDeathDataSorted = state.PeopleDeathData.slice().sort(
          (a, b) => a - b
        );
        const PeopleDeathQuantiles = quantile(
          PeopleDeathDataSorted,
          [0, 0.25, 0.5, 0.75, 1]
        );
        for (let i = 0; i < PeopleDeathQuantiles.length - 1; i++) {
          PeopleDeathClass.push({
            name: `Class ${i + 1}`,
            min: PeopleDeathQuantiles[i],
            max: PeopleDeathQuantiles[i + 1],
          });
        }
        state.PeopleDeathClass = PeopleDeathClass;

        //  InfrastructureDamage Class
        const InfrastructureClass = [];
        const InfrastructureDataSorted = state.InfrastructureData.slice().sort(
          (a, b) => a - b
        );
        const InfrastructureQuantiles = quantile(
          InfrastructureDataSorted,
          [0, 0.25, 0.5, 0.75, 1]
        );
        for (let i = 0; i < InfrastructureQuantiles.length - 1; i++) {
          InfrastructureClass.push({
            name: `Class ${i + 1}`,
            min: InfrastructureQuantiles[i],
            max: InfrastructureQuantiles[i + 1],
          });
        }
        state.InfrastructureClass = InfrastructureClass;
      })
      .addCase(DamageLossAsyncGETThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default damageLossSlice.reducer;
