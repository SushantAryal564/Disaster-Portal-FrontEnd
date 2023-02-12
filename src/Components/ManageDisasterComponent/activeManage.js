import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiFillInfoCircle } from "react-icons/ai";
import { BiAlarm } from "react-icons/bi";
const ActiveManage = ({ changeMarkerDataState }) => {
  const [wardIncident, setWardIncident] = useState([]);
  const wardId = localStorage.getItem("WardId");

  let now = new Date();
  let oneMonthAgo = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    now.getDate()
  );

  let today = now.toISOString().substr(0, 10);
  let lastMonth = oneMonthAgo.toISOString().substr(0, 10);
  const [startDate, setStartDate] = useState(lastMonth);
  const [endDate, setEndDate] = useState(today);
  const WardIncident = async (wardId, startDate, endDate) => {
    let data = await fetch(
      `http://127.0.0.1:8000/api/v1/disaster/disasterEventwithoutgeom/?name=&Ward=${wardId}&type=&is_closed=false&startTime__gte=${startDate}T18%3A00%3A00Z&startTime__gt=&startTime=&startTime__lte=${endDate}T18%3A00%3A00Z`
    );
    let wardIncident = await data.json();
    changeMarkerDataState(wardIncident);
    setWardIncident(wardIncident);
  };
  useEffect(() => {
    WardIncident(wardId, lastMonth, today);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    WardIncident(wardId, startDate, endDate);
  };
  console.log(wardIncident);
  return (
    <React.Fragment>
      <div className="flex items-center ">
        <div className="w-1/2 ">
          <label
            className="block text-xs text-gray-700 font-medium mb-1"
            htmlFor="start-date"
          >
            Start Date
          </label>
          <input
            type="date"
            id="start-date"
            className="block w-full border p-1 appearance-none focus:outline-none focus:border-indigo-500"
            value={startDate || lastMonth}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className=" w-1/2 m-2">
          <label
            className="block text-xs text-gray-700 font-medium mb-1"
            htmlFor="end-date"
          >
            End Date
          </label>
          <input
            type="date"
            id="end-date"
            className="block w-full   border p-1 appearance-none focus:outline-none focus:border-indigo-500"
            value={endDate || today}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-teal-500 mt-5 text-white p-1"
        >
          Submit
        </button>
      </div>
      {wardIncident.map((data) => {
        return (
          <div className="border-gray-200 border-b-2 p-3 hover:bg-gray-200 py-4">
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
      })}
    </React.Fragment>
  );
};

export default ActiveManage;
