import { configureStore } from "@reduxjs/toolkit";
import disasterReducer from "./Slices/disasterSlice";
import slidebarcontentreducer from "./Slices/slidebarcontentslice";
import slidebarReducer from "./Slices/uiSlice";
import livedatareducer from "./Slices/livedataSlice";
const store = configureStore({
  reducer: {
    disaster: disasterReducer,
    slidebar: slidebarReducer,
    slidebarcontent: slidebarcontentreducer,
    live: livedatareducer,
  },
});
export default store;
