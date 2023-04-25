import React, { useState, useEffect, useRef } from "react";
import { Fragment } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { BiAlarm } from "react-icons/bi";

function ActivityLog({ changeMarkerDataState }) {
  const [DisasterId, setDisasterID] = useState(0);
  const [activity, setActivity] = useState("");
  const [date, setDate] = useState("");
  const [reloder, setreloder] = useState(true);
  let formIsValid = false;
  if (activity.trim() !== "" || date !== "") {
    formIsValid = true;
  }
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
    setActivity("");
    setDate("");
    setreloder(!reloder);
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
  }, [reloder]);
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

  // useEffect(()=>{
  //   DisasterActivityLogHandler(wardId)
  // },[reloder])

  const ActivityLogLayout =
    DisasterActivityLog == []
      ? ""
      : DisasterActivityLog.map((data) => {
          return (
            <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
              <li class="pb-3 sm:pb-4">
                <div>{data.action_name}</div>
                <div className="text-xs text-gray-500">
                  {data.time_of_action}
                </div>
                <div>{data.logCreator}</div>
              </li>
            </ul>
          );
        });
  const DisasterEventLayout = WardDisasterData?.map((data) => {
    return (
      <div
        className="border-gray-200 border-b-2 p-1 hover:bg-gray-200 py-2"
        onClick={() => {
          DisasterActivityLogHandler(data.id);
        }}
      >
        <div className="text-md font-medium flex flex-row ">
          <div className="text-red-500 text-sm flex flex-col">
            <span className="px-3">
              {" "}
              <img
                className="w-9 h-6 pt-1 mt-1"
                src={`http://127.0.0.1:8000/${data?.type?.title}.svg`}
              />
            </span>
            <p className="text-xs text-black mx-6 my-1">
              {data?.type?.title || "none"}
            </p>
          </div>
          <span className="font-normal ml-2 mt-1 pt-1 text-sm">
            <div className="font-semibold text-xs"> {data.name}</div>
            <div>
              <div className="text-xs  text-gray-500 flex justify-start ">
                <div className="flex items-center my-1">
                  <span>
                    <BiAlarm />
                  </span>
                  <span className="mx-2">{data.date_event.slice(0, 10)}</span>
                  <span className="ml-2">{data.date_event.slice(11, 16)}</span>
                  <span className="ml-2">WARD-{data.Ward.ward}</span>
                  <span className="ml-3">
                    {data.ADDRESS || "Dhapakhel,Gems School"}
                  </span>
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
        {/* <div onClick={activeIncidentLogHandler}>Active Incident Log</div>
        <div onClick={allIncidentLogHandler}>Past Incident Log</div> */}
      </div>
      <div className="grid grid-cols-8">
        <div className="col-span-4">{DisasterEventLayout}</div>
        <div className="col-span-4 ">
          <div className="bg-gray-200 mt-2 text-white px-2 py-2">
            <center>Activity Log List</center>
          </div>
          <div>{ActivityLogLayout}</div>
          <div></div>
        </div>
      </div>
      <form className="w-full max-w-lg">
        <div class="w-full px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-password"
          >
            Update Response Activity
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
    </Fragment>
  );
}
export default ActivityLog;
