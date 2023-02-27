import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GeoJSON } from "react-leaflet";
import { buildingAsyncGETThunk } from "../../store/Slices/buildingSlice";
import { Fragment } from "react";
function BuildingjsonLoader() {
  const dispatch = useDispatch();
  const wardID = localStorage.getItem("WardId");

  const building = useSelector((state) => {
    return state.buildings.allbuilding;
  });
  useEffect(() => {
    dispatch(buildingAsyncGETThunk(wardID));
  }, [wardID]);
  const styleGEOJSON = (feature) => {
    return {
      fillColor: `red`,
      opacity: 1,
      weight: 0,
      color: "none",
      fillOpacity: 0.7,
    };
  };
  return (
    <Fragment>
      {building ? <GeoJSON data={building} style={styleGEOJSON} /> : null}
    </Fragment>
  );
}

export default BuildingjsonLoader;
