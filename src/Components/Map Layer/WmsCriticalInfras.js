import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Pane,
  WMSTileLayer,
} from "react-leaflet";

import L from "leaflet";
import { useMapEvents } from "react-leaflet/hooks";

export const WmsCriti = () => {
  const [clickLocation, setClickLocation] = useState(null);
  const umap = useMap();
  const map = useMapEvents({
    click: (e) => {
      setClickLocation(e.latlng);

      var point = umap.latLngToContainerPoint(e.latlng);
      var url =
        "http://localhost:8080/geoserver/wms?" +
        "SERVICE=WMS" +
        "&VERSION=1.1.1" +
        "&REQUEST=GetFeatureInfo" +
        "&LAYERS=new:buildings" +
        "&QUERY_LAYERS=new:buildings" +
        "&INFO_FORMAT=application/json" +
        "&EXCEPTIONS=application/json" +
        "&WIDTH=" +
        umap.getSize().x +
        "&HEIGHT=" +
        umap.getSize().y +
        "&X=" +
        Math.round(point.x) +
        "&Y=" +
        Math.round(point.y) +
        "&BBOX=" +
        map.getBounds().toBBoxString();
    },
  });

  return (
    <Pane name="amyPane" style={{ zIndex: 650 }}>
      <WMSTileLayer
        url="http://localhost:8080/geoserver/new/wms"
        params={{
          layers: "new:buildings",
          format: "image/png",
          transparent: true,
          version: "1.1.0",
          styles: "buildings",
        }}
      ></WMSTileLayer>
    </Pane>
  );
};
