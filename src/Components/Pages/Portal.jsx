import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { LayersControl, MapContainer, Marker, TileLayer } from "react-leaflet";
import { GeoJSONLayer } from "../Map Layer/GeoJSONLayer";
import { SideBar } from "../Layout/SidebarNav";
import ResetViewControl from "@20tab/react-leaflet-resetview";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useDispatch, useSelector } from "react-redux";
import { disasterAsyncGETThunk } from "../../store/Slices/disasterSlice";
import { slidebarAction } from "../../store/Slices/uiSlice";
import Markers from "../UI/Marker";
import Dashboard from "../../Sidebar/dashboard";
import Incident from "../../Sidebar/incident";
import DamageLoss from "../../Sidebar/damageLoss";
import RiskInfo from "../../Sidebar/riskinfo";
import { LiveData } from "../../Sidebar/realtime";
import ReportAnAncident from "../../Sidebar/reportIncident";
import DataArchieve from "../../Sidebar/dataArchive";
import Situation from "../../Sidebar/situation";
import Feedback from "@mui/icons-material/Feedback";
export const Portal = () => {
  const dispatch = useDispatch();
  var [jsonLalitpurMetro, setJsonLalitpurMetro] = useState("");
  var [jsonWard, setJsonWard] = useState("");
  const postStatus = useSelector((state) => state.disaster.status);
  const slidebarState = useSelector((state) => {
    return state.slidebar.slidebarState;
  });
  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(disasterAsyncGETThunk());
    }
  }, [postStatus, dispatch]);
  const component = useSelector((state) => {
    return state.component;
  });
  const changeComponent = (compName) => {
    switch (compName) {
      case "Dashboard":
        return <Dashboard />;
      case "Incident":
        return <Incident />;
      case "DamageLoss":
        return <DamageLoss />;
      case "RiskInfo":
        return <RiskInfo />;
      case "RealTime":
        return <LiveData />;
      case "Report":
        return <ReportAnAncident />;
      case "DataArchieve":
        return <DataArchieve />;
      case "Situation":
        return <Situation />;
      case "Feedback":
        return <Feedback />;
      default:
        return <Dashboard />;
    }
  };
  const ComponentToRender = changeComponent(component);
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
  const changeSlidebarState = () => {
    dispatch(slidebarAction.changeSlidebarState());
  };
  useEffect(() => {
    metroJSON();
    wardJSON();
  }, []);
  const data = useSelector((state) => state.disaster.data);
  const position = [27.67571580617923, 85.3183283194577];
  const scrollWheelZoom = true;
  return (
    <Layout>
      <div className="flex">
        <div
          className={`${
            slidebarState ? "w-2/4" : "w-0"
          } duration-300 h-[90vh] relative`}
        >
          {ComponentToRender}
          <NavigateNextIcon
            style={{
              maxWidth: "30px",
              maxHeight: "50px",
              minWidth: "30px",
              minHeight: "50px",
            }}
            className={`
              bg-white absolute cursor-pointer -right-[30px] top-1/2 w-7 border-2 z-50  ${
                slidebarState ? "rotate-180 rounded-l-lg" : "rounded-r-lg"
              }`}
            onClick={changeSlidebarState}
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
