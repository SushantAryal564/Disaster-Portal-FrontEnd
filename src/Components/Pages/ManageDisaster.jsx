import React, { useState, useRef } from "react";
import Layout from "../Layout/Layout";
import {
  MapContainer,
  Marker,
  TileLayer,
  FeatureGroup,
  Circle,
} from "react-leaflet";
import { removebuilding } from "../../store/Slices/buildingSlice";
import LayerControler from "../Map Layer/LayerControler";
import { useSelector } from "react-redux";
import { GetManageDisasterWardShpGETThunk } from "../../store/Slices/manageDisasterSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ActiveManage from "../ManageDisasterComponent/activeManage";
import ActivityLog from "../ManageDisasterComponent/ActivityLog";
import AllIncident from "../ManageDisasterComponent/AllIncident";
import DisasterAnalysis from "../ManageDisasterComponent/DisasterAnalysis";
import { ManageDisasterLegend, ManageDataLegend } from "../Legends/Legend";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import WardjsonLoader from "../Map Layer/WardjsonLoader";
import ManageData from "../ManageDisasterComponent/ManageData";
import BuildingjsonLoader from "../Map Layer/BuildingjsonLoader";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import wk from "wellknown";

const ManageDisaster = () => {
  const featureGroupRef = useRef();
  const [polygonCoords, setPolygonCoords] = useState([]);
  const [slidebarState, setSlidebarState] = useState(true);
  const dispatch = useDispatch();
  const [disasterData, setDisasterData] = useState([]);
  const [currenttab, setCurrentTab] = useState("activeIncident");
  const [ManageDisasterPanel, ChangeManageDisasterPanel] = useState(
    <ActiveManage changeMarkerDataState={setDisasterData} />
  );
  var prevLayer = "";
  const wardId = useSelector((state) => {
    return state.auth.wardId;
  });

  useEffect(() => {
    dispatch(GetManageDisasterWardShpGETThunk(wardId));
  }, [dispatch, wardId]);

  const scrollWheelZoom = true;
  const changeSlidebarState = () => {
    setSlidebarState(!slidebarState);
  };
  function onCreated(e) {
    const layer = e.layer;
    featureGroupRef.current.addLayer(layer);

    const latLngs = layer.getLatLngs()[0];
    const coords = latLngs.map(({ lat, lng }) => [lng, lat]);

    // Convert coordinates to a Polygon and then to WKT
    const polygonWkt = wk.stringify({
      type: "Polygon",
      coordinates: [coords],
    });

    setPolygonCoords(polygonWkt);
  }

  function onEdited(e) {
    const layers = e.layers;
    layers.eachLayer((layer) => {
      const latlngs = layer.getLatLngs()[0];
      const coords = latlngs.map(({ lat, lng }) => [lng, lat]);
    });
    const featureGroup = featureGroupRef.current;
    const layerArray = featureGroup.getLayers();
    const coordsArray = layerArray.map((layer) => {
      const latlngs = layer.getLatLngs()[0];
      return latlngs.map(({ lat, lng }) => [lng, lat]);
    });
    const multiPolygonWkt = wk.stringify({
      type: "Polygon",
      coordinates: [coordsArray],
    });
    setPolygonCoords(multiPolygonWkt);
  }
  function onDelete() {
    const featureGroup = featureGroupRef.current;
    featureGroup.clearLayers();
    setPolygonCoords(null);
  }
  useEffect(() => {
    setCurrentTab("activeManage");
    ChangeManageDisasterPanel(
      <ActiveManage changeMarkerDataState={setDisasterData} />
    );
  }, []);
  return (
    <Layout>
      <div className="flex">
        <div
          className={`${
            slidebarState ? "w-3/5" : "w-0"
          } duration-300 h-[90vh] relative`}
        >
          <div className="flex">
            <div className="flex justify-center">
              <div
                onClick={() => {
                  setCurrentTab("activeManage");
                  ChangeManageDisasterPanel(
                    <ActiveManage changeMarkerDataState={setDisasterData} />
                  );
                }}
                className="bg-green-500 text-white  text-xs py-1 px-1 border-indigo-900 border-r-2 border-white"
              >
                Active Incident
              </div>
              <div
                onClick={() => {
                  setCurrentTab("allincident");
                  ChangeManageDisasterPanel(
                    <AllIncident
                      changeMarkerDataState={setDisasterData}
                      setCurrentTab={setCurrentTab}
                    />
                  );
                }}
                className="bg-green-500 text-white  text-xs py-1 px-1 border-indigo-900 border-r-2 border-white"
              >
                All Incident
              </div>
              <div
                onClick={() => {
                  setCurrentTab("activitylog");
                  ChangeManageDisasterPanel(
                    <ActivityLog
                      changeMarkerDataState={setDisasterData}
                      setCurrentTab={setCurrentTab}
                    />
                  );
                }}
                className="bg-green-500 text-white  text-xs py-1 px-1 border-indigo-900 border-r-2 border-white"
              >
                Activity Log
              </div>
              <div
                onClick={() => {
                  setCurrentTab("disasterAnalysis");
                  ChangeManageDisasterPanel(
                    <DisasterAnalysis
                      changeMarkerDataState={setDisasterData}
                      setCurrentTab={setCurrentTab}
                    />
                  );
                }}
                className="bg-green-500 text-white  text-xs py-1 px-1 border-indigo-900 border-r-2 border-white"
              >
                Analysis
              </div>
              <div
                className="bg-green-500 text-white  text-xs py-1 px-1 border-indigo-900 border-r-2 border-white"
                onClick={() => {
                  setCurrentTab("manageData");
                  ChangeManageDisasterPanel(
                    <ManageData
                      changeMarkerDataState={setDisasterData}
                      setCurrentTab={setCurrentTab}
                      polygonCoords={polygonCoords}
                    />
                  );
                }}
              >
                Manage Data
              </div>
            </div>
          </div>
          <div>{ManageDisasterPanel}</div>
          <NavigateNextIcon
            style={{
              maxWidth: "30px",
              maxHeight: "50px",
              minWidth: "30px",
              minHeight: "50px",
            }}
            className={`
              bg-white absolute cursor-pointer -right-[30px] top-1/2 w-7 border-2 z-20  ${
                slidebarState ? "rotate-180 rounded-l-lg" : "rounded-r-lg"
              }`}
            onClick={changeSlidebarState}
          />
        </div>
        <MapContainer
          center={[27.671704, 85.316118]}
          zoom={14}
          scrollWheelZoom={scrollWheelZoom}
          className="mt-1 z-10"
        >
          {/* LOADS THE BOUNDARY OF LOGGED IN WARD */}
          <WardjsonLoader />
          {/* FOR RENDERING MARKER INTO THE MAP COMPONENT BELOW IS USED*/}
          <LayerControler currenttab={currenttab} disasterData={disasterData} />
          <WardjsonLoader />
          {currenttab === "disasterAnalysis" ? <ManageDisasterLegend /> : ""}
          {currenttab === "manageData" ? <BuildingjsonLoader /> : null}
          <ManageDisasterLegend />
          {currenttab === "manageData" ? (
            <FeatureGroup ref={featureGroupRef}>
              <EditControl
                position="topright"
                onEdited={onEdited}
                onCreated={onCreated}
                onDeleted={onDelete}
                draw={{
                  circle: false,
                  rectangle: false,
                  marker: false,
                }}
                FeatureGroup={featureGroupRef.current}
              />
            </FeatureGroup>
          ) : null}
          {/* conditionaly rendder this when current tab is manageData */}
          {currenttab === "manageData" ? <BuildingjsonLoader /> : ""}
        </MapContainer>
      </div>
    </Layout>
  );
};
export default ManageDisaster;

/*********** */
