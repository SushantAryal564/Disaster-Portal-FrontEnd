import React, { useState, useRef } from "react";
import Layout from "../Layout/Layout";
import {
  MapContainer,
  Marker,
  TileLayer,
  FeatureGroup,
  Circle,
} from "react-leaflet";
import LayerControler from "../Map Layer/LayerControler";
import { useSelector } from "react-redux";
import { GetManageDisasterWardShpGETThunk } from "../../store/Slices/manageDisasterSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ActiveManage from "../ManageDisasterComponent/activeManage";
import ActivityLog from "../ManageDisasterComponent/ActivityLog";
import AllIncident from "../ManageDisasterComponent/AllIncident";
import DisasterAnalysis from "../ManageDisasterComponent/DisasterAnalysis";
import { ManageDisasterLegend } from "../Legends/Legend";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import WardjsonLoader from "../Map Layer/WardjsonLoader";
import ManageData from "../ManageDisasterComponent/ManageData";
import BuildingjsonLoader from "../Map Layer/BuildingjsonLoader";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import wk from "wellknown";
import { removebuilding } from "../../store/Slices/buildingSlice";

const ManageDisaster = () => {
  const featureGroupRef = useRef();
  const [polygonCoords, setPolygonCoords] = useState([]);
  const [slidebarState, setSlidebarState] = useState(true);
  const dispatch = useDispatch();
  const [disasterData, setDisasterData] = useState([]);
  const [currenttab, setCurrentTab] = useState("activeIncident");
  console.log('current tab',currenttab)
  const [ManageDisasterPanel, ChangeManageDisasterPanel] = useState(
    <ActiveManage changeMarkerDataState={setDisasterData} />
  );

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
    dispatch(removebuilding())
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
    console.log("Polygon WKT:", polygonWkt);
  }

  function onEdited(e) {
    const layers = e.layers;
    layers.eachLayer((layer) => {
      const latlngs = layer.getLatLngs()[0];
      const coords = latlngs.map(({ lat, lng }) => [lng, lat]);
      console.log("New polygon coordinates:", coords);
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
    console.log("Polygon WKT:", multiPolygonWkt);
  }
  function onDelete() {
    const featureGroup = featureGroupRef.current;
    featureGroup.clearLayers();
    setPolygonCoords(null);
  }
  return (
    <Layout>
      <div className="flex">
        <div
          className={`${
            slidebarState ? "w-3/5" : "w-0"
          } duration-300 h-[90vh] relative`}
        >
          <div className="flex">
            <div className="flex justify-evenly">
              <div
                onClick={() => {
                  setCurrentTab("activeManage");
                  ChangeManageDisasterPanel(
                    <ActiveManage changeMarkerDataState={setDisasterData} />
                  );
                }}
                className="bg-red-400"
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
                className="bg-blue-400"
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
                className="bg-green-400"
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
                className="bg-pink-400"
              >
                Analysis
              </div>
              <div
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
          
                    
          {/* LEGEND FOR DIFFERENT TABS */}
          {currenttab === "disasterAnalysis" ? <ManageDisasterLegend currenttab={currenttab}/> : ""}
          {currenttab === "manageData" ? <ManageDisasterLegend currenttab={currenttab}/> : ""}

          {/* LOAD BUILDING POLYGON MANAGE DATE */}
          
          {currenttab === "manageData" ? <ManageDisasterLegend  disasterData={disasterData} currenttab={currenttab}/> : null}
          {currenttab === "activeManage" ?<ManageDisasterLegend currenttab={disasterData}/>: null}
          {currenttab === "allIncidents" ?<ManageDisasterLegend currenttab={disasterData}/> : null}
        
          
          
          {/* MANAGE DATA EDIT POLYGON */}
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


        </MapContainer>
      </div>
    </Layout>
  );
};
export default ManageDisaster;

/*********** */
