import React, { useEffect } from "react";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import {
  ActiveDisasterGETAsyncThunk,
  AllDisasterGETAsyncThunk,
  GETDisasterIncidentResponse,
} from "../store/Slices/situationSlice";
import { setPanel, setDisaster } from "../store/Slices/situationSlice";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

function Situation() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AllDisasterGETAsyncThunk());
    dispatch(ActiveDisasterGETAsyncThunk());
  }, []);
  const currenttab = useSelector((state) => state.situation.selectedPanel);
  const activeIncident = useSelector((state) => state.situation.activeIncident);
  const allIncident = useSelector((state) => state.situation.allIncident);
  const activityLog = useSelector((state) => state.situation.activityResponse);
  const selectedDisaster = useSelector(
    (state) => state.situation.selectedDisaster
  );
  const getIncident = (incident) => {
    return (
      <div className="px-3 mt-2 w-full">
        {incident.map((incident) => (
          <div className=" border p-2 rounded-md mb-2">
            <div
              className="flex gap-2 w-full items-center mt-2"
              onClick={() => {
                dispatch(setDisaster(incident.id));
                dispatch(GETDisasterIncidentResponse(incident.id));
              }}
            >
              <div className="flex flex-row items-center px-1">
                <div className="flex flex-col items-center">
                  <img
                    src={incident.type.icon}
                    style={{ width: "40px", height: "40px" }}
                  />
                  <div className="text-xs">{incident.type.title}</div>
                </div>
              </div>
              <div className="w-full cursor-pointer">
                <div className=" w-full flex justify-between">
                  <div className="text-xl">{incident.name}</div>
                </div>
                <div>
                  <span>Address:&nbsp;&nbsp;</span>
                  {incident.address}
                </div>
                <div>
                  <div>
                    <span>Start Time: &nbsp;&nbsp;</span>
                    {new Date(incident.date_event).toLocaleString("en-US", {
                      timeZone: "UTC",
                    })}
                  </div>
                </div>
              </div>
            </div>
            {incident.id === selectedDisaster && (
              <div className="mt-3 px-2">
                <div
                  className="flex justify-center mt-2 font-bold text-red-600 items-center cursor-pointer"
                  onClick={() => {
                    dispatch(setDisaster(null));
                  }}
                >
                  <div>Hide response</div>
                  <ArrowDropUpIcon />
                </div>
                <div>
                  {activityLog?.map((log) => {
                    return (
                      <div>
                        <div>{log.action_name}</div>
                        <div>
                          Time: &nbsp;&nbsp;
                          {new Date(log.time_of_action).toLocaleString(
                            "en-US",
                            {
                              timeZone: "UTC",
                            }
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Header />
      <div className="flex justify-around mt-2">
        <div
          onClick={() => {
            dispatch(setPanel("activeIncident"));
            dispatch(setDisaster(null));
          }}
          className={`${
            currenttab === "activeIncident"
              ? "bg-[#418fde] text-white"
              : "border-2 text-[#418fde] border-[#418fde]"
          } text-base text-center rounded-md w-36  font-bold py-2 px-2  border-r-2 `}
        >
          Active Incident
        </div>
        <div
          onClick={() => {
            dispatch(setPanel("allIncident"));
            dispatch(setDisaster(null));
          }}
          className={`${
            currenttab === "allIncident"
              ? "bg-[#418fde] text-white"
              : "border-2 text-[#418fde] border-[#418fde]"
          } text-base text-center rounded-md w-36  font-bold py-2 px-2  border-r-2 `}
        >
          All Incident
        </div>
      </div>
      <div className="scrollbar">
        {currenttab === "activeIncident"
          ? getIncident(activeIncident)
          : getIncident(allIncident)}
      </div>
    </div>
  );
}

export default Situation;
