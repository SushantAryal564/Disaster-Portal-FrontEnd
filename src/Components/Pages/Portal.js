import React from "react";
import Layout from "../Layout/Layout";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { defaultIcon } from "../../assests/icons/defaulticon";
import { incident } from "./../../Data/incident";
const MarkerLayer = ({ data }) => {
  return data.features.map((feature) => {
    const { coordinates } = feature.geometry;
    return (
      <Marker
        key={String(coordinates)}
        position={[coordinates[1], coordinates[0]]}
        icon={defaultIcon}
      >
        <Popup>
          This is where I live. <br /> Pretty ugly place to live.
        </Popup>
      </Marker>
    );
  });
};
export const Portal = () => {
  const position = [27.6492, 85.3195];
  const scrollWheelZoom = true;
  return (
    <Layout>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={scrollWheelZoom}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MarkerLayer data={incident} />
      </MapContainer>
    </Layout>
  );
};
export default Portal;
