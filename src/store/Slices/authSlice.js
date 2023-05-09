import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  access_token: null,
  isWard: false,
  wardId: "",
  wardNumber: "",
  isMunicipality: false,
  isCluster: false,
  ClusterName: "",
};

const authSlice = createSlice({
  name: "auth_token",
  initialState,
  reducers: {
    setUserToken: (state, action) => {
      state.access_token = action.payload.access_token;
    },
    unSetUserToken: (state, action) => {
      state.access_token = action.payload.access_token;
    },
    setUserInfo: (state, action) => {
      if (action.payload.IsWard) {
        state.wardId = action.payload.WardId;
        state.wardNumber = action.payload.wardNumber;
        state.isWard = true;
        state.isMunicipality = false;
      }
      if (action.payload.IsMunicipality) {
        state.isMunicipality = true;
      }
      if (action.payload.IsCluster) {
        state.isCluster = true;
        state.ClusterName = action.payload.ClusterName;
      }
    },
  },
});

export const { setUserToken, unSetUserToken, setUserInfo } = authSlice.actions;

export default authSlice.reducer;
