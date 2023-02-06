import React from "react";
import Layout from "../Layout/Layout";
import { MapContainer } from "react-leaflet";
const AboutUs = (props) => {

  const scrollWheelZoom = true;
  const position = [27.67571580617923, 85.3183283194577];
  
  return (
    <Layout>
     <MapContainer
          center={position}
          zoom={14}
          scrollWheelZoom={scrollWheelZoom}
          className="mt-1 z-10"
        >
         <LayersControl position="topright">
            <LayersControl.BaseLayer name="OSM Streets">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="World Imagery">
              <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer checked name="Grey Imagery">
              <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png" />
            </LayersControl.BaseLayer>
            
          </LayersControl>

        </MapContainer>
    </Layout>
  );
};
export default AboutUs;
