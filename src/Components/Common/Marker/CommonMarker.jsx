import React from "react";
import { Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: require("../../../assests/marker.png"),
  iconSize: [40, 40],
  iconAnchor: [17, 46],
  popupAnchor: [0, -46],
});
const CommonMarker = ({ data }) => {
  console.log(data);
  const createClusterCustomIcon = function (cluster) {
    return L.divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      className: "marker-cluster-custom-risk",
      iconSize: L.point(35, 35, true),
    });
  };
  return (
    <MarkerClusterGroup
      showCoverageOnHover={false}
      spiderfyDistanceMultiplier={2}
      iconCreateFunction={createClusterCustomIcon}
    >
      {data.features?.map((feature) => (
        <Marker
          position={[
            feature.geometry.coordinates[1],
            feature.geometry.coordinates[0],
          ]}
          icon={markerIcon}
        >
          <Popup>
            <b>Is this the place?</b>
          </Popup>
        </Marker>
      ))}
    </MarkerClusterGroup>
  );
};

export default CommonMarker;
