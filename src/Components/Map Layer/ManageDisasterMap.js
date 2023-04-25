import React from "react";
import MapContainer from "../Common/Maplibre/MapContainer";
import GeojsonLayer from "../Common/Maplibre/GeojsonLayer";
import useMaplibreMap from "../Common/Maplibre/useMaplibreMap";

const ManageDisasterMap = () => {
  const { map, mapRef } = useMaplibreMap({ center: [87, 28], zoom: 10 });
  return (
    <div className="h-full">
      <MapContainer
        mapObj={map}
        mapRef={mapRef}
        style={{ width: "100%", height: "100vh" }}
      >
        <GeojsonLayer />
      </MapContainer>
    </div>
  );
};

export default ManageDisasterMap;
