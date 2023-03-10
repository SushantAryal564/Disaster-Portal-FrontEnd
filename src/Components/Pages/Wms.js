import React from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Pane,
  WMSTileLayer,
} from "react-leaflet";

import L from "leaflet";

export const Wms = () => {
  return (
    <>
    <Pane name="myPane" style={{ zIndex: 650 }}>
    <WMSTileLayer url='http://localhost:8080/geoserver/new/wms' params={{layers: 'new:lalitpurWard',
    format: 'image/png',
    transparent: true,
    version: '1.1.0',
    styles:'ward2'}}></WMSTileLayer>
    </Pane>
      <Pane name="myPane" style={{ zIndex: 650 }}>
        <WMSTileLayer
          url="http://localhost:8080/geoserver/Lalitpur/wms"
          params={{
            layers: "Lalitpur:LalitpurMetro",
            format: "image/png",
            transparent: true,
            version: "1.1.0",
          }}
        ></WMSTileLayer>
      </Pane>
    </>
  );
};
