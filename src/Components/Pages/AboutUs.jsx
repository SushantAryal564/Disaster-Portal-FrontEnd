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
        </MapContainer>
    </Layout>
  );
};
export default AboutUs;
