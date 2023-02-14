import { CloudDone } from "@mui/icons-material";
import React, { useState, useEffect, useRef } from "react";
import { Fragment } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { BiAlarm } from "react-icons/bi";
import useInput from "../../hooks/formValidationHook";

function ActivityLog({ changeMarkerDataState }) {
  const refContainerActivity = useRef();
  const {
    enteredValue: enteredCreator,
    valueIsValid: CreatorIsValid,
    hasError: CreatorHasError,
    valueHandler: CreatorValueHandler,
    blurHandler: CreatorBlurHandler,
    reset: resetCreator,
  } = useInput((value) => value.trim() != "");

  const [WardDisasterData, setWardDisasterData] = useState([]);
  const [DisasterActivityLog, setDisasterActivityLog] = useState("");
  const wardId = localStorage.getItem("WardId");
  let access_token = localStorage.getItem("access_token");
  let formIsValid = false;
  if (CreatorIsValid) {
    formIsValid = true;
  }
  console.log(formIsValid);

  const WardActiveDisaster = async () => {
    let data = await fetch(
      `http://127.0.0.1:8000/api/v1/disaster/disasterEventwithoutgeom/?name=&Ward=${wardId}&type=&is_closed=false&startTime__gte=&startTime__gt=&startTime=&startTime__lte=`
    );
    let wardActiveIncident = await data.json();
    setWardDisasterData(wardActiveIncident);
    changeMarkerDataState(wardActiveIncident);
  };
  const WardPastDisaster = async () => {
    let data = await fetch(
      `http://127.0.0.1:8000/api/v1/disaster/disasterEventwithoutgeom/?name=&Ward=${wardId}&type=&is_closed=true&startTime__gte=&startTime__gt=&startTime=&startTime__lte=`
    );
    let wardAllIncident = await data.json();
    setWardDisasterData(wardAllIncident);
    changeMarkerDataState(wardAllIncident);
  };
  let DisasterId = null;
  const DisasterActivity = async (id) => {
    DisasterId = id;
    let data = await fetch(
      `http://127.0.0.1:8000/api/v1/response/activity/?disaster__is_closed=&disaster__id=${id}&disaster__Ward=`
    );
    let DisasterActivityLog = await data.json();
    setDisasterActivityLog(DisasterActivityLog);
  };
  const ActivitySendToBackend = async (activity, creator, date, id) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", access_token);
    const response = fetch("http://127.0.0.1:8000/api/v1/response/activity/", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        disaster: id,
        action_name: activity,
        time_of_action: date,
        logCreator: creator,
      }),
    });
  };
  const ActivityFormSubmitHandler = (e) => {
    e.preventDefault();
    console.log(refContainerActivity.current.value, enteredCreator, DisasterId);
    ActivitySendToBackend(
      refContainerActivity.current.value,
      enteredCreator,
      DisasterId
    );
    refContainerActivity.current.value = "";
    resetCreator();
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
            <form
              className="w-full max-w-lg"
              onSubmit={ActivityFormSubmitHandler}
            >
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
                  ref={refContainerActivity}
                ></textarea>
              </div>
              <div class="flex flex-wrap w-full px-3">
                <div class="w-full md:w-1/2 mb-6 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-first-name"
                  >
                    Log Creator
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    placeholder="Jane"
                    onChange={CreatorValueHandler}
                    onBlur={CreatorBlurHandler}
                    value={enteredCreator}
                  />
                </div>
                <div class="w-full md:w-1/2 px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-last-name"
                  >
                    Time
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type="datetime-local"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div class="px-3 md:items-center">
                <div class="md:w-2/3">
                  <button
                    class="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="button"
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
