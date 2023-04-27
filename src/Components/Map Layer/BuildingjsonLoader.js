import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GeoJSON } from "react-leaflet";
import {
  addbuilding,
  removebuilding,
  buildingAsyncGETThunk,
  chageSelection,
  singlebuidlingThunk,
  removeAPIbuilding,setwkt
} from "../../store/Slices/buildingSlice";
import { Fragment } from "react";
import { current } from "@reduxjs/toolkit";

function BuildingjsonLoader({ prevLayer }) {
  const dispatch = useDispatch();
  const wardID = localStorage.getItem("wardNumber");
  
  const building = useSelector((state) => {
    return state.buildings.allbuilding;
  });
  var prevLayer = "";
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

  const onEachFeature = (feature, layer) => {
    layer.on({
      click: (event) => {
        dispatch(addbuilding(event.target.feature.properties));
        if (prevLayer) {
          prevLayer.setStyle({
            fillColor: "red",
            color: "red",
            weight: 1,
            fillOpacity: 0.7,
          });
        }

        layer.setStyle({
          fillColor: "blue",
          color: "blue",
          weight: 1,
          fillOpacity: 0.7,
        });
        if (prevLayer == layer) {
          dispatch(removebuilding());
          prevLayer.setStyle({
            fillColor: "red",
            color: "red",
            weight: 1,
            fillOpacity: 0.7,
          });
          prevLayer = "";
          return;
        }
       
        prevLayer = layer;
      },
    });
  };
  return (
    <Fragment>
      {building ? (
        <GeoJSON
          data={building}
          style={styleGEOJSON}
          onEachFeature={onEachFeature}
        />
      ) : null}
      {/* {buildingdata?<GeoJSON
          data={buildingdata}
          style={styleGEOJSON2}
          onEachFeature={onEachFeature}
        />:""} */}
    </Fragment>
  );
}

export default BuildingjsonLoader;
