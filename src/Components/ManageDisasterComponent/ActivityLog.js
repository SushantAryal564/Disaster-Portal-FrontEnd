import React, { useState, useEffect, useRef } from "react";
import { Fragment } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { BiAlarm } from "react-icons/bi";

function ActivityLog({ changeMarkerDataState }) {
  const [DisasterId, setDisasterID] = useState(0);
  const [activity, setActivity] = useState("");
  const [date, setDate] = useState("");
  let formIsValid = false;
  if (activity.trim() !== "" || date !== "") {
    formIsValid = true;
  }
  console.log(DisasterId);
  const [WardDisasterData, setWardDisasterData] = useState([]);
  const [DisasterActivityLog, setDisasterActivityLog] = useState("");
  const wardId = localStorage.getItem("WardId");
  const wardNumber = localStorage.getItem("wardNumber");
  let access_token = localStorage.getItem("access_token");
  const WardActiveDisaster = async () => {
    let data = await fetch(
      `http://127.0.0.1:8000/api/v1/disaster/disasterEventwithoutgeom/?name=&Ward=${wardId}`
    );
    let wardActiveIncident = await data.json();
    setWardDisasterData(wardActiveIncident);
    changeMarkerDataState(wardActiveIncident);
  };
  const WardPastDisaster = async () => {
    let data = await fetch(
      `http://127.0.0.1:8000/api/v1/disaster/disasterEventwithoutgeom/?name=&Ward=${wardId}`
    );
    let wardAllIncident = await data.json();
    setWardDisasterData(wardAllIncident);
    changeMarkerDataState(wardAllIncident);
  };
  const DisasterActivity = async (id) => {
    let data = await fetch(
      `http://127.0.0.1:8000/api/v1/response/activity/?disaster__is_closed=&disaster__id=${id}&disaster__Ward=`
    );
    let DisasterActivityLog = await data.json();
    setDisasterActivityLog(DisasterActivityLog);
  };
  const ActivitySendToBackend = async (activity, creator, date, id) => {
    let access_token = localStorage.getItem("access_token");
    console.log("accs----->", access_token);
    let data = {
      disaster: id,
      action_name: activity,
      deployed_inventory: 1,
      time_of_action: date,
      logCreator: creator,
    };
    const response = await fetch(
      "http://127.0.0.1:8000/api/v1/response/activity/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(data),
      }
    );
    const responseData = await response.json();
    return responseData;
  };
  const ActivityFormSubmitHandler = (e) => {
    e.preventDefault();
    ActivitySendToBackend(
      activity,
      "Ward " + wardNumber,
      date + ":45.345208Z",
      DisasterId
    );
  };
  useEffect(() => {
    WardActiveDisaster(wardId);
  }, []);
  const activeIncidentLogHandler = () => {
    WardActiveDisaster();
  };
  const allIncidentLogHandler = () => {
    WardPastDisaster();
    setDisasterActivityLog([]);
  };
  const DisasterActivityLogHandler = (id) => {
    setDisasterID(id);
    DisasterActivity(id);
  };
  const ActivityLogLayout =
    DisasterActivityLog == []
      ? ""
      : DisasterActivityLog.map((data) => {
          return (
            <div>
              <div>{data.action_name}</div>
              <div>{data.time_of_action}</div>
              <div>{data.logCreator}</div>
            </div>
          );
        });
  const DisasterEventLayout = WardDisasterData.map((data) => {
    return (
      <div
        className="border-gray-200 border-b-2 p-3 hover:bg-gray-200 py-4"
        onClick={() => {
          DisasterActivityLogHandler(data.id);
        }}
      >
        <div className="text-md font-medium flex flex-row ">
          <div className="text-red-500 text-sm flex flex-col">
            <span className="px-3">
              {" "}
              <AiFillInfoCircle size={20} />
            </span>
            <p className="text-xs">{data?.type?.title || "none"}</p>
          </div>
          <span className="font-normal ml-5 pt-1 text-sm">
            <div className="font-semibold text-xs"> {data.name}</div>
            <div>
              <div className="text-xs  text-gray-500 flex justify-start ">
                <span className="">{data.date}</span>
                <div className="flex items-center px-2">
                  <span>
                    <BiAlarm />
                  </span>
                  <span className="pl-1">{data.time || "none"}</span>
                </div>
              </div>
            </div>
          </span>
        </div>
      </div>
    );
  });
  return (
    <Fragment>
      <div className="flex justify-between px-10">
        <div onClick={activeIncidentLogHandler}>Active Incident Log</div>
        <div onClick={allIncidentLogHandler}>Past Incident Log</div>
      </div>
      <div className="grid grid-cols-6 gap-1">
        <div className="col-span-2">{DisasterEventLayout}</div>
        <div className="col-span-4">
          <div>{ActivityLogLayout}</div>
          <div>
            <form className="w-full max-w-lg">
              <div class="w-full px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-password"
                >
                  Response Activity
                </label>
                <textarea
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="Type response Activity Here....."
                  required
                  value={activity}
                  onChange={(event) => setActivity(event.target.value)}
                ></textarea>
              </div>
              <div class="flex flex-wrap w-full">
                <div class="w-full md:w-1/2 px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-last-name"
                  >
                    Time
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3"
                    id="grid-last-name"
                    type="datetime-local"
                    placeholder="Doe"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    required
                  />
                </div>
              </div>
              <div class="px-3 md:items-center">
                <div class="md:w-2/3">
                  <button
                    class="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="button"
                    onClick={ActivityFormSubmitHandler}
                    disabled={!formIsValid}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ActivityLog;
