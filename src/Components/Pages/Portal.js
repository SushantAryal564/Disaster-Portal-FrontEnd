import React from "react";
import Layout from "../Layout/Layout";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
export const Portal = (props) => {
  return (
    <Layout>
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </Layout>
  );
};
export default Portal;
