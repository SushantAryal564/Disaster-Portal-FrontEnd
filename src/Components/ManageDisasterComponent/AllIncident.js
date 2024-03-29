import React, { useState, useEffect } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { BiAlarm } from "react-icons/bi";

function AllIncident({ changeMarkerDataState }) {
  let now = new Date();
  let today = now.toISOString().substr(0, 10);
  const [wardAllIncident, setWardAllIncident] = useState([]);
  const wardId = localStorage.getItem("wardNumber");
  const WardIncident = async () => {
    let data = await fetch(
      `http://127.0.0.1:8000/api/v1/disaster/disasterEvent/?name=&Ward=${wardId}&type=&is_closed=&startTime__gte=&startTime__gt=&startTime__lt=`
    );
    let wardIncident = await data.json();
    changeMarkerDataState(wardIncident);
    setWardAllIncident(wardIncident);
  };
  useEffect(() => {
    WardIncident();
  }, []);
  return (
    <div>
      {wardAllIncident ? (
        <>
          {wardAllIncident.map((data) => {
            return (
              <div className="border-gray-200 border-b-2 p-1 hover:bg-gray-200 py-2">
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
                          <span className="mx-2">
                            {data.date_event.slice(0, 10)}
                          </span>
                          <span className="ml-2">
                            {data.date_event.slice(11, 16)}
                          </span>
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
          })}
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default AllIncident;
