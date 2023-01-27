import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { LayersControl, MapContainer, Marker, TileLayer } from "react-leaflet";
import { SideBar } from "../Layout/SidebarNav";
import { LalitpurOda as LalitpurWard } from "./../../Data/LalitpurOda";
import { GeoJSONLayer } from "../Map Layer/GeoJSONLayer";
import ResetViewControl from "@20tab/react-leaflet-resetview";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useDispatch, useSelector } from "react-redux";
import { disasterAsyncGETThunk } from "../../store/Slices/disasterSlice";
import Markers from "../UI/Marker";
export const Portal = () => {
  const dispatch = useDispatch();
  var [jsonLalitpurMetro, setJsonLalitpurMetro] = useState("");
  var [jsonWard, setJsonWard] = useState("");
  const postStatus = useSelector((state) => state.disaster.status);
  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(disasterAsyncGETThunk());
    }
  }, [postStatus, dispatch]);
  const metroJSON = async () => {
    let data = await fetch(
      "http://127.0.0.1:8000/api/v1/spatial/lalitpurMetro/"
    );
    let datajson = await data.json();
    setJsonLalitpurMetro(datajson);
  };
  const wardJSON = async () => {
    let data = await fetch("http://127.0.0.1:8000/api/v1/spatial/ward/");
    let datajson = await data.json();
    setJsonWard(datajson);
  };
  useEffect(() => {
    metroJSON();
    wardJSON();
  }, []);
  console.log(jsonLalitpurMetro);
  const data = useSelector((state) => state.disaster.data);
  const [open, setOpen] = useState(false);
  const position = [27.67571580617923, 85.3183283194577];
  const scrollWheelZoom = true;
  return (
    <Layout>
      <div className="flex">
        <div
          className={`${open ? "w-2/4" : "w-0"} duration-300 h-[90vh] relative`}
        >
          <NavigateNextIcon
            style={{
              maxWidth: "30px",
              maxHeight: "50px",
              minWidth: "30px",
              minHeight: "50px",
            }}
            className={`
              bg-white absolute cursor-pointer -right-[30px] top-1/2 w-7 border-2 z-50  ${
                open ? "rotate-180 rounded-l-lg" : "rounded-r-lg"
              }`}
            onClick={() => setOpen(!open)}
          />
        </div>
        <MapContainer
          center={position}
          zoom={14}
          scrollWheelZoom={scrollWheelZoom}
          className="mt-1 z-10"
        >
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="OSM Streets">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="World Imagery">
              <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
            </LayersControl.BaseLayer>
            {jsonLalitpurMetro ? (
              <GeoJSONLayer
                data={jsonLalitpurMetro}
                name="Lalitpur Metropolitian City"
              />
            ) : (
              ""
            )}
            {jsonWard ? (
              <GeoJSONLayer
                data={jsonWard}
                name="Lalitpur Metropolitian Ward"
              />
            ) : (
              ""
            )}
          </LayersControl>
          <ResetViewControl
            title="Reset view"
            icon="url(/some/relative/path.png)"
            position="topright"
          />
          {data.map((event) => (
            <Markers disaster={event} key={event.id} />
          ))}
        </MapContainer>
        <SideBar />
      </div>
    </Layout>
  );
};
export default Portal;
