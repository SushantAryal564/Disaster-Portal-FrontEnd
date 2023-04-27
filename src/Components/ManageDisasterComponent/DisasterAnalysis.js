import React from "react";
import { useState, useEffect } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { BiAlarm } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setlatlng } from "./../../store/Slices/latlng";
import {
  GetAmenitiesWithInBuffer,
  GetBuildingWithInBuffer,
  GetForestWithInBuffer,
  GetWaterbodyWithInBuffer,
} from "./../../store/Slices/featureSlice";
import Accordian from "../UI/Accordian";

function DisasterAnalysis({ changeMarkerDataState }) {
  let now = new Date();
  let dispatch = useDispatch();
  let today = now.toISOString().substr(0, 10);
  const [wardAllIncident, setWardAllIncident] = useState([]);
  const wardId = localStorage.getItem("WardId");
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
    <div>
      <Accordian AllDisaster={wardAllIncident} latlngHandler={latlngHandler} />
    </div>
  );
}
export default DisasterAnalysis;
