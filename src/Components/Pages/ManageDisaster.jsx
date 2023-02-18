import React, { useState } from "react";
import Layout from "../Layout/Layout";
import { LayersControl, MapContainer, Marker, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import { GetManageDisasterWardShpGETThunk } from "../../store/Slices/manageDisasterSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GeoJSON } from "react-leaflet";
import ActiveManage from "../ManageDisasterComponent/activeManage";
import ActivityLog from "../ManageDisasterComponent/ActivityLog";
import AllIncident from "../ManageDisasterComponent/AllIncident";
import Markers from "../UI/Marker";
import DisasterAnalysis from "../ManageDisasterComponent/DisasterAnalysis";
const ManageDisaster = () => {
  const dispatch = useDispatch();
  const [disasterData, setDisasterData] = useState([]);
  const [analysisResultBuilding, setAnalysisResultBuilding] = useState(null);
  const [analysisResultAmenities, setAnalysisResultAmenities] = useState(null);
  const [analysisResultWaterBody, setAnalysisResultWaterBody] = useState(null);
  const [analysisResultForest, setAnalysisResultForest] = useState(null);

  const [ManageDisasterPanel, ChangeManageDisasterPanel] = useState(
    <ActiveManage changeMarkerDataState={setDisasterData} />
  );
  const wardId = useSelector((state) => {
    return state.auth.wardId;
  });
  const wardShp = useSelector((state) => {
    return state.manageDisaster.data[0];
  });

  const fetchBufferBuilding = async (latlng) => {
    console.log(latlng);
    const data = await fetch(
      `http://127.0.0.1:8000/api/v1/analysis/building/?lat=${latlng[1]}&lon=${latlng[0]}&buffer_distance=30`
    );
    const affectedBuilding = await data.json();
    setAnalysisResultBuilding(affectedBuilding);
  };
  const fetchBufferForest = async (latlng) => {
    console.log(latlng);
    const data = await fetch(
      `http://127.0.0.1:8000/api/v1/analysis/forest/?lat=${latlng[1]}&lon=${latlng[0]}&buffer_distance=30`
    );
    const affectedBuilding = await data.json();
    setAnalysisResultForest(affectedBuilding);
  };
  const fetchBufferWaterbody = async (latlng) => {
    console.log(latlng);
    const data = await fetch(
      `http://127.0.0.1:8000/api/v1/analysis/waterbody/?lat=${latlng[1]}&lon=${latlng[0]}&buffer_distance=30`
    );
    const affectedBuilding = await data.json();
    setAnalysisResultWaterBody(affectedBuilding);
  };
  const fetchBufferAmenities = async (latlng) => {
    console.log(latlng);
    const data = await fetch(
      `http://127.0.0.1:8000/api/v1/analysis/waterbody/?lat=${latlng[1]}&lon=${latlng[0]}&buffer_distance=30`
    );
    const affectedBuilding = await data.json();
    setAnalysisResultAmenities(affectedBuilding);
  };
  const fetchBufferHandler = (latlng) => {
    fetchBufferBuilding(latlng);
    fetchBufferForest(latlng);
    fetchBufferWaterbody(latlng);
    fetchBufferAmenities(latlng);
  };
  useEffect(() => {
    dispatch(GetManageDisasterWardShpGETThunk(wardId));
  }, [dispatch, wardId]);

  const getGeoJSON = (featureAnalysisResult) => {
    return featureAnalysisResult ? (
      <GeoJSON data={featureAnalysisResult}></GeoJSON>
    ) : null;
  };
  const scrollWheelZoom = true;
  const position = [27.67571580617923, 85.3183283194577];

  return (
    <Layout>
      <div className="grid grid-cols-4">
        <div className="col-span-2 ">
          <div className="flex gap gap-1">
            <div
              onClick={() => {
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
                ChangeManageDisasterPanel(
                  <AllIncident changeMarkerDataState={setDisasterData} />
                );
              }}
              className="bg-blue-400"
            >
              All Incident
            </div>
            <div
              onClick={() => {
                ChangeManageDisasterPanel(
                  <ActivityLog changeMarkerDataState={setDisasterData} />
                );
              }}
              className="bg-green-400"
            >
              Activity Log
            </div>
            <div
              onClick={() => {
                ChangeManageDisasterPanel(
                  <DisasterAnalysis
                    changeMarkerDataState={setDisasterData}
                    analysisRequestHandler={fetchBufferHandler}
                  />
                );
              }}
              className="bg-pink-400"
            >
              Analysis
            </div>
          </div>
          <div>{ManageDisasterPanel}</div>
        </div>
        <div className="col-span-2 ">
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
            <LayersControl position="topright">
              <LayersControl.Overlay name="Buidling">
                {getGeoJSON(analysisResultBuilding)}
              </LayersControl.Overlay>
              <LayersControl.Overlay name="Forest">
                {getGeoJSON(analysisResultForest)}
              </LayersControl.Overlay>
              <LayersControl.Overlay name="Waterbody">
                {getGeoJSON(analysisResultWaterBody)}
              </LayersControl.Overlay>
              <LayersControl.Overlay name="Amenities">
                {getGeoJSON(analysisResultAmenities)}
              </LayersControl.Overlay>
            </LayersControl>
            {wardShp ? <GeoJSON data={wardShp}></GeoJSON> : ""}
            {disasterData.map((event) => {
              return <Markers disaster={event} key={event.id} />;
            })}
          </MapContainer>
        </div>
      </div>
    </Layout>
  );
};
export default ManageDisaster;
