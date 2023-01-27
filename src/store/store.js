import { configureStore } from "@reduxjs/toolkit";
import disasterReducer from "./Slices/disasterSlice";
import slidebarcontentreducer from "./Slices/slidebarcontentslice";
import slidebarReducer from "./Slices/uiSlice";
const store = configureStore({
  reducer: {
    disaster: disasterReducer,
    slidebar: slidebarReducer,
    slidebarcontent: slidebarcontentreducer,
  },
});
export default store;
