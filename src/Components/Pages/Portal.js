import React from "react";
import Layout from "../Layout/Layout";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { defaultIcon } from "../../assests/icons/defaulticon";
export const Portal = (props) => {
  const position = [27.757244403230466, 85.33090112811595];
  const scrollWheelZoom = true;
  return (
    <Layout>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={scrollWheelZoom}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} icon={defaultIcon}>
          <Popup>
            This is where I live. <br /> Pretty ugly place to live.
          </Popup>
        </Marker>
      </MapContainer>
    </Layout>
  );
};
export default Portal;
