import React, { useState, useRef } from "react";
import Layout from "../Layout/Layout";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import LayerControler from "../Map Layer/LayerControler";
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
import { DamageAndLossLegend, ManageDisasterLegend } from "../Legends/Legend";

const ManageDisaster = () => {
  const mapRef = useRef();

  const dispatch = useDispatch();
  const [disasterData, setDisasterData] = useState([]);
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

  return (
    <Layout>
      <div className="grid grid-cols-6">
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
                    map={mapRef}
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
        <div className="col-span-4">
          <MapContainer
            center={[27.671704, 85.316118]}
            zoom={14}
            scrollWheelZoom={scrollWheelZoom}
            className="mt-1 z-10"
          >
            <LayerControler disasterData={disasterData} />
            {ManageDisasterPanel ===
            (
              <DisasterAnalysis
                changeMarkerDataState={setDisasterData}
                map={mapRef}
              />
            ) ? (
              <ManageDisasterLegend />
            ) : (
              ""
            )}
            <ManageDisasterLegend />
          </MapContainer>
        </div>
      </div>
    </Layout>
  );
};
export default ManageDisaster;
