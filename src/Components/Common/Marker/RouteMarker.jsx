import React from "react";
import { useSelector } from "react-redux";
import { Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { getMarker } from "../../utils/GetMarker";
import L from "leaflet";

const RouteMarker = ({ data, infrastructure }) => {
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
          icon={getMarker(infrastructure)}
          eventHandlers={{
            click: (e) => {
              console.log(e, "I am event");
            },
          }}
        >
          <Popup>
            <div className="font-bold">{feature.properties.name}</div>
          </Popup>
        </Marker>
      ))}
    </MarkerClusterGroup>
  );
};

export default RouteMarker;
