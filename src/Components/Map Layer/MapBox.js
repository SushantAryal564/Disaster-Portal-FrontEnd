import React, { useEffect, useState } from "react";
import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
function MapBox() {
  const [viewState, setViewState] = React.useState({
    latitude: 27.541967,
    longitude: 85.334297,
    zoom: 11,
    pitch: 60,
  });

  return (
    <ReactMapGL
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      mapboxAccessToken="pk.eyJ1Ijoic3VzaGFudDU2NCIsImEiOiJjbGY0ejk5MHUxN20wM3NuemU5em55NnM4In0.TWgTzgMnkQQJYwY3vUlHrg"
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/navigation-night-v1"
    ></ReactMapGL>
  );
}

export default MapBox;
