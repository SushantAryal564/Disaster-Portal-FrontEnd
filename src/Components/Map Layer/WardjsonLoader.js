import React, { useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";
import { useSelector } from "react-redux";
import { useMap } from "react-leaflet";
import { Fragment } from "react";

function WardjsonLoader() {
  const leafletMap = useMap();
  const [WardJSON, setWardJSON] = useState();
  const wardId = localStorage.getItem("WardId");
  const getWardJSONData = async () => {
    const data = await fetch(
      `http://127.0.0.1:8000/api/v1/spatial/wards/${wardId}/`
    );
    const wardjson = await data.json();
    setWardJSON(wardjson);
  };
  useEffect(() => {
    getWardJSONData();
  }, [wardId]);
  // const wardShp = useSelector((state) => {
  //   return state.manageDisaster.data[0];
  // });
  // console.log(
  //   wardShp.properties.centroid.coordinates[0],
  //   wardShp.properties.centroid.coordinates[1]
  // );
  useEffect(() => {
    if (WardJSON) {
      leafletMap.setView(
        [
          WardJSON.properties.centroid.coordinates[1],
          WardJSON.properties.centroid.coordinates[0],
        ],
        16
      );
    }
  }, [WardJSON]);
  const wardStyle = () => {
    return {
      fillColor: `none`,
      opacity: 1,
      weight: 1,
      color: "black",
      fillOpacity: 0.7,
    };
  };
  return (
    <Fragment>
      {WardJSON ? <GeoJSON data={WardJSON} style={wardStyle}></GeoJSON> : null}
    </Fragment>
  );
}

export default WardjsonLoader;
