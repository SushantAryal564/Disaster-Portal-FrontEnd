import React from "react";
import Layout from "../Layout/Layout";
import { MapContainer, TileLayer } from "react-leaflet";
import { incident } from "../../Data/incident";
import MarkerLayer from "../../Layers/Marker_Layer";
import { mountains } from "../../Data/highest_points";
import MarkerLayerWithToolTip from "../../Layers/Marker_Layer_with_tooltip.jsx";
import { SideBar } from "../Layout/Sidebar";
export const Portal = () => {
  const position = [27.6492, 85.3195];
  const scrollWheelZoom = true;
  return (
    <Layout>
      <div className="flex flex-row">
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={scrollWheelZoom}
          className="mt-1"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MarkerLayer data={incident} />
          <MarkerLayerWithToolTip data={mountains} />
        </MapContainer>
        <SideBar />
      </div>
    </Layout>
  );
};
export default Portal;
