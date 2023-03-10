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
  const map = useMap();
  const legendUrl =
    "http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=Lalitpur:PopulationLalitpurMetro_final";

  fetch(legendUrl)
    .then((response) => {
      if (response.ok) {
        return response.blob();
      } else {
        throw new Error("Failed to fetch legend");
      }
    })
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const legendImg = document.createElement("img");
      legendImg.src = url;
      legendImg.onload = () => {
        const legend = L.control({ position: "topleft" });
        legend.onAdd = function (map) {
          const div = L.DomUtil.create("div", "info legend");
          div.innerHTML = '<img src="' + url + '" class="z-1000">';
          return div;
        };
        legend.addTo(map);
      };
    })
    .catch((error) => {
      console.error(error);
    });
  return (
    <>
      <Pane name="myPane" style={{ zIndex: 650 }}>
        <WMSTileLayer
          url="http://localhost:8080/geoserver/Lalitpur/wms"
          params={{
            layers: "Lalitpur:PopulationLalitpurMetro_final",
            format: "image/png",
            transparent: true,
            version: "1.1.0",
            styles: "wardsld",
          }}
        ></WMSTileLayer>
      </Pane>
    </>
  );
};
