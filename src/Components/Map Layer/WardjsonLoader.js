import React, { useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";
import { useSelector } from "react-redux";
import { useMap } from "react-leaflet";
import { Fragment } from "react";

function WardjsonLoader() {
  const leafletMap = useMap();
  const [WardJSON, setWardJSON] = useState();
  const wardId = localStorage.getItem("wardNumber");
  //DISCLAMIER--this end point takes wardnumber not ID altho variavble is wardID ,it is actually wardNUMBER,wardId = localStorage.getItem("wardNumber");
  const getWardJSONData = async () => {
    if (wardId) {
      const data = await fetch(
        `http://127.0.0.1:8000/api/v1/spatial/ward/${wardId}/`
      );
      const wardjson = await data.json();
      setWardJSON(wardjson);
    } else {
      const data = await fetch(`http://127.0.0.1:8000/api/v1/spatial/ward/`);
      const wardjson = await data.json();
      setWardJSON(wardjson);
    }
  };
  useEffect(() => {
    getWardJSONData();
  }, [wardId]);
  // const wardShp = useSelector((state) => {
  //   return state.manageDisaster.data[0];
  // });
  //   wardShp.properties.centroid.coordinates[0],
  //   wardShp.properties.centroid.coordinates[1]
  // );
  useEffect(() => {
    if (WardJSON && wardId) {
      leafletMap.setView(
        [
          WardJSON.properties.centroid.coordinates[1],
          WardJSON.properties.centroid.coordinates[0],
        ],
        15
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
