import React from "react";
import { useState, useEffect } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { AiFillSetting } from "react-icons/ai";
import { BiAlarm } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setlatlng } from "./../../store/Slices/latlng";
import {
  GetAmenitiesWithInBuffer,
  GetBuildingWithInBuffer,
  GetForestWithInBuffer,
  GetWaterbodyWithInBuffer,
  setdistance,
} from "./../../store/Slices/featureSlice";
import Accordian from "../UI/Accordian";

function DisasterAnalysis({ changeMarkerDataState }) {
  let now = new Date();
  let dispatch = useDispatch();
  let today = now.toISOString().substr(0, 10);
  const [wardAllIncident, setWardAllIncident] = useState([]);
  const wardId = localStorage.getItem("WardId");
  const bufferd=useSelector((state) => {
    //  console.log(state.manageDisaster)
    return (state.feature.bufferdistance)
  })
  // console.log(bufferd,'---------------------------------------------------------------------------')
  const WardIncident = async () => {
    let data = await fetch(
      `http://127.0.0.1:8000/api/v1/disaster/disasterEventwithoutgeom/?name=&Ward=${wardId}`
    );
    let wardIncident = await data.json();
    changeMarkerDataState(wardIncident);
    setWardAllIncident(wardIncident);
  };
  const latlngHandler = (array) => {
    
    dispatch(setlatlng(array));
    if (array) {
      dispatch(GetAmenitiesWithInBuffer(array));
      dispatch(GetBuildingWithInBuffer(array));
      dispatch(GetForestWithInBuffer(array));
      dispatch(GetWaterbodyWithInBuffer(array));
    }
  };
  useEffect(() => {
    WardIncident();
  }, []);
  return (
    <div className="h-[80vh] scrollbar">
      <div className="flex justify-start">
      <div className="p-2 hover:text-red-500 bg-[#e35163] text-white">
       <div className="flex flex-start text-sm items-center"
       >
         < AiFillSetting/>Analysis Settings
       </div>
              <div className="after:">
              
                <label
                  htmlFor="latitude"
                  className="text-xs font-normal leading-tight text-blue-gray-500 transition-all font-bold mx-3"
                >
                 Distance in meters
                </label>
                <input 
                
                  id="latitude"
                  name="latitude"
                  type="number"
                  defaultValue={bufferd}
                  onChange={(e)=>{
                    dispatch(setdistance(e.target.value))
                    
                  }}
                  className="h-9 border rounded border-stone-300	w-40 hover:border-red-500 hover:text-black px-2 py-2 my-1 text-red-500"
                 
                ></input>
              </div>
          </div>
      </div>
      <Accordian AllDisaster={wardAllIncident} latlngHandler={latlngHandler} />
    </div>
  );
}
export default DisasterAnalysis;
