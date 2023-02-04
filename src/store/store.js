import { configureStore } from "@reduxjs/toolkit";
import disasterReducer from "./Slices/disasterSlice";
import slidebarcontentreducer from "./Slices/slidebarcontentslice";
import slidebarReducer from "./Slices/uiSlice";
import livedatareducer from "./Slices/livedataSlice";
import componetreducer from "./Slices/hope";
import markerReducer from "./Slices/selecteddata";
import disasterIncidentreducer from "./Slices/incidentSlice";
const store = configureStore({
  reducer: {
    disaster: disasterReducer,
    disasterIncident: disasterIncidentreducer,
    slidebar: slidebarReducer,
    slidebarcontent: slidebarcontentreducer,
    live: livedatareducer,
    component: componetreducer,
    selected: markerReducer,
  },
});
export default store;
