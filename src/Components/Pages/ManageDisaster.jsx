import React, { useState } from "react";
import Layout from "../Layout/Layout";
import { LayersControl, MapContainer, Marker, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
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
  const [ManageDisasterPanel, ChangeManageDisasterPanel] = useState(
    <ActiveManage changeMarkerDataState={setDisasterData} />
  );
  const [building, setBuilding] = useState([]);
  const [forest, setForest] = useState([]);
  const [waterbody, setWaterBody] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const wardId = useSelector((state) => {
    return state.auth.wardId;
  });
  const wardShp = useSelector((state) => {
    return state.manageDisaster.data[0];
  });
  const analysisResultAmenities = useSelector((state) => {
    return state.feature.amenities;
  });
  const analysisResultBuilding = useSelector((state) => {
    return state.feature.building;
  });
  const analysisResultForest = useSelector((state) => {
    return state.feature.forest;
  });
  const analysisResultWaterBody = useSelector((state) => {
    return state.feature.waterbody;
  });
  const getGeoJSON = (featureAnalysisResult) => {
    return featureAnalysisResult ? (
      <GeoJSON
        data={featureAnalysisResult}
        // style={(feature) => {
        //   return {
        //     color: "black",
        //     fillColor:
        //       featureAnalysisResult === building
        //         ? "red"
        //         : featureAnalysisResult === forest
        //         ? "green"
        //         : featureAnalysisResult === amenities
        //         ? "brown"
        //         : "blue",
        //     fillOpacity: 1,
        //     weight: 0.5,
        //   };
        // }}
      ></GeoJSON>
    ) : null;
  };
  useEffect(() => {
    dispatch(GetManageDisasterWardShpGETThunk(wardId));
    setBuilding(analysisResultBuilding);
    setForest(analysisResultForest);
    setWaterBody(analysisResultWaterBody);
    setAmenities(analysisResultAmenities);
  }, [dispatch, wardId, analysisResultAmenities]);

  const scrollWheelZoom = true;

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
                  <DisasterAnalysis changeMarkerDataState={setDisasterData} />
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
            center={[27.671704, 85.316118]}
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
              <LayersControl.Overlay checked name="Buidling">
                {building.length > 0 ? (
                  <GeoJSON
                    data={building[0]}
                    style={(feature) => {
                      return {
                        color: "black",
                        fillColor: "red",
                        fillOpacity: 1,
                        weight: 0.5,
                      };
                    }}
                  ></GeoJSON>
                ) : (
                  ""
                )}
              </LayersControl.Overlay>
              <LayersControl.Overlay checked name="Forest">
                {getGeoJSON(forest)}
              </LayersControl.Overlay>
              <LayersControl.Overlay checked name="Waterbody">
                {getGeoJSON(waterbody)}
              </LayersControl.Overlay>
              <LayersControl.Overlay checked name="Amenities">
                {getGeoJSON(amenities)}
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
