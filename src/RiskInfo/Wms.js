import React from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Pane,
  WMSTileLayer,
} from "react-leaflet";

import L from "leaflet";
import { ClassNames } from "@emotion/react";

export const Wms = () => {
  return (
    <>
      <Pane name="myPane" style={{ zIndex: 650 }}>
        <WMSTileLayer
          url="http://localhost:8080/geoserver/Lalitpur/wfs"
          params={{
            layers: "Lalitpur:PopulationLalitpurMetro_final",
            format: "image/png",
            transparent: true,
            version: "1.1.0",
            styles: "wardsld",
            noWrap: true,
          }}
        ></WMSTileLayer>
      </Pane>
    </>
  );
};
