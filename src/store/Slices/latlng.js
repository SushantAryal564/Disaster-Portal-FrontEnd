import { createSlice } from "@reduxjs/toolkit";
const LatLngSlice = createSlice({
  name: "latlng",
  initialState: "",
  reducers: {
    setlatlng: (state, action) => {
      return action.payload;
    },
  },
});

export const { setlatlng } = LatLngSlice.actions;

export default LatLngSlice.reducer;
