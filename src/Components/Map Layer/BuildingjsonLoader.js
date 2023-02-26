import React from "react";
import { useSelector } from "react-redux";
import { GeoJSON } from "react-leaflet";
import { Fragment } from "react";
function BuildingjsonLoader() {
  const building = useSelector((state) => {
    return state.buildings.allbuilding;
  });
  return (
    <Fragment>{building ? <GeoJSON data={building}></GeoJSON> : null}</Fragment>
  );
}

export default BuildingjsonLoader;
