import AuthSlice from "./authenticaltionSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: { auth: AuthSlice.reducer },
});
export default store;
