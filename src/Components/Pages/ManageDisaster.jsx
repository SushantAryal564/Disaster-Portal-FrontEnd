import React, { useState, useRef } from "react";
import Layout from "../Layout/Layout";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
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

const ManageDisaster = () => {
  const mapRef = useRef();
  const [slidebarState, setSlidebarState] = useState(false);
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
  const changeSlidebarState = () => {
    setSlidebarState(!slidebarState);
  };
  return (
    <Layout>
      <div className="flex">
        <div
          className={`${
            slidebarState ? "w-4/5" : "w-0"
          } duration-300 h-[90vh] relative`}
        >
          <div className="flex">
            <div className="flex justify-evenly">
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
          <LayerControler disasterData={disasterData} />
          <WardjsonLoader />
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
    </Layout>
  );
};
export default ManageDisaster;

/*********** */
