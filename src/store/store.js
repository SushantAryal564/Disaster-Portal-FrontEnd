import { configureStore } from "@reduxjs/toolkit";
import disasterReducer from "./Slices/disasterSlice";
import slidebarcontentreducer from "./Slices/slidebarcontentslice";
import slidebarReducer from "./Slices/uiSlice";
import livedatareducer from "./Slices/livedataSlice";
import componetreducer from "./Slices/hope";
import markerReducer from "./Slices/selecteddata";
import disasterIncidentreducer from "./Slices/incidentSlice";
import damagelossreducer from "./Slices/damageLossSlice";
import damageLegendSlice from "./Slices/damageLegendSlice";
import authReducer from "./Slices/authSlice";
import { userAuthApi } from "./../services/auth";
import manageDisasterReducer from "./Slices/manageDisasterSlice";
import latlngreducer from "./Slices/latlng";
import featureReducer from "./Slices/featureSlice";
import buildingReducer from "./Slices/buildingSlice";
import riskinfoReducer from "./Slices/riskinfoSlice";
import chartReducer from "./Slices/chartSlice";
import { manageApiSlice } from "../services/MuniClusManage";

const store = configureStore({
  reducer: {
    disaster: disasterReducer,
    disasterIncident: disasterIncidentreducer,
    slidebar: slidebarReducer,
    slidebarcontent: slidebarcontentreducer,
    live: livedatareducer,
    component: componetreducer,
    selected: markerReducer,
    damageloss: damagelossreducer,
    damageLegend: damageLegendSlice,
    chart: chartReducer,
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    [manageApiSlice.reducerPath]: manageApiSlice.reducer,
    auth: authReducer,
    manageDisaster: manageDisasterReducer,
    latlng: latlngreducer,
    feature: featureReducer,
    buildings: buildingReducer,
    riskinfo: riskinfoReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    userAuthApi.middleware,
    manageApiSlice.middleware,
  ],
});
export default store;
