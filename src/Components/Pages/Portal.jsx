import React from "react";
import Layout from "../Layout/Layout";
import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
import { SideBar } from "../Layout/SidebarNav";
import { Lalitpur } from "./../../Data/Lalitpur";
import { LalitpurAdmin } from "./../../Data/LalitpurLocal";
import { LalitpurOda as LalitpurWard } from "./../../Data/LalitpurOda";
import { GeoJSONLayer } from "../Map Layer/GeoJSONLayer";

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
          <GeoJSONLayer data={Lalitpur} name="Lalitpur" />
          <LayersControl position="topright">
            <GeoJSONLayer data={Lalitpur} name="Lalitpur" />
            <GeoJSONLayer
              data={LalitpurAdmin}
              name="Lalitpur Adminstrative Boundary"
            />
            <GeoJSONLayer data={LalitpurWard} name="Lalitpur Ward Boundary" />
          </LayersControl>
        </MapContainer>
        <SideBar />
      </div>
    </Layout>
  );
};
export default Portal;
