import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import React from "react";

export const GetRoute = createAsyncThunk("chartInfo", async (d) => {
  console.log("")
  let start=d[0]
  let end=d[1]
  console.log(start,end,"STArt andd end")
  const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62482d8246fe91fc4aefb85d4a6e9b73e86b&start=${start[1]},${start[0]}&end=${end[1]},${end[0]}`;
  console.log(url,"asdddddd") 
  let res =await fetch(url)
  let da=await res.json()
  console.log("ROUTEEEEEEEEEEEEEE",da)
  return da  
  // fetch(url)
  //       .then(response => response.json())
  //       .then(data => {
  //          return data
  //       })
});


const initialState = {
    legendItem: "incident",
    currentroute:null,
    startlocation:null,
    endlocation:null
};


const DamageLegendSlice = createSlice({
  name: "slidebar",
  initialState,
  reducers: {
    changeLegendItem(state, action) {
      state.legendItem = action.payload;
    },
    setroute(state,action){
      state.currentroute=action.payload
    },
    setStartLocation(state,action){
      state.startlocation=action.payload
    },
    setDestinationLocation(state,action){
      state.startlocation=action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(GetRoute.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(GetRoute.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentroute =(action.payload);
      })
      .addCase(GetRoute.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const {slidebarAction,setroute,setStartLocation,setDestinationLocation} = DamageLegendSlice.actions;
export default DamageLegendSlice.reducer;
