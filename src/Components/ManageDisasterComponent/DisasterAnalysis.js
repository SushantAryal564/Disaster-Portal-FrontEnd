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
  let dispatch = useDispatch();
  const [wardAllIncident, setWardAllIncident] = useState([]);
  const wardId = localStorage.getItem("WardId");
  const bufferd = useSelector((state) => {
    //  console.log(state.manageDisaster)
    return state.feature.bufferdistance;
  });
  const WardIncident = async () => {
    if (wardId) {
      let data = await fetch(
        `http://127.0.0.1:8000/api/v1/disaster/disasterEventwithoutgeom/?name=&Ward=${wardId}`
      );
      let wardIncident = await data.json();
      changeMarkerDataState(wardIncident);
      setWardAllIncident(wardIncident);
    } else {
      let data = await fetch(
        "http://127.0.0.1:8000/api/v1/disaster/disasterEventwithoutgeom/"
      );
      let wardIncident = await data.json();
      changeMarkerDataState(wardIncident);
      setWardAllIncident(wardIncident);
      console.log("I am here");
    }
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
    <div className="h-[80vh] scrollbar mx-3">
      <div className="flex justify-center mb-2">
        <div className="p-2 hover:text-red-500 bg-[#e35163] text-white rounded-sm">
          <div className="flex flex-start gap-1 text-sm items-center">
            <AiFillSetting />
            Analysis Settings
          </div>
          <div>
            <label
              htmlFor="latitude"
              className="text-xs items-center leading-tight text-blue-gray-500 transition-all font-bold mx-3"
            >
              Distance in meters
            </label>
            <input
              id="latitude"
              name="latitude"
              type="number"
              defaultValue={bufferd}
              onChange={(e) => {
                dispatch(setdistance(e.target.value));
              }}
              className="h-9 border rounded border-stone-300	w-40 hover:border-red-500 hover:text-black px-2 py-2 my-1 text-red-500"
            ></input>
          </div>
        </div>
      </div>
      <Accordian AllDisaster={wardAllIncident} latlngHandler={latlngHandler} />
      {/* <button className="mx-2 inline-block rounded bg-danger px-6 pt-2.5 pb-2 my-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)]">
              Delete
            </button> */}
      {/* <button className="mx-2 inline-block rounded bg-danger px-6 pt-2.5 pb-2 my-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)]" >Trigger Alert In this region</button> */}
    </div>
  );
}
export default DisasterAnalysis;
