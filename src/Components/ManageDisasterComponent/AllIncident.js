import React, { useState, useEffect } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { BiAlarm } from "react-icons/bi";

function AllIncident({ changeMarkerDataState }) {
  let now = new Date();
  let today = now.toISOString().substr(0, 10);
  const [wardAllIncident, setWardAllIncident] = useState([]);
  const wardId = localStorage.getItem("WardId");
  const WardIncident = async () => {
    let data = await fetch(
      `http://127.0.0.1:8000/api/v1/disaster/disasterEventwithoutgeom/?name=&Ward=${wardId}&type=&is_closed=&startTime__gte=&startTime__gt=&startTime=&startTime__lte=${today}T18%3A00%3A00Z`
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
      
      {wardAllIncident.map((data) => {
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
    </div>
  );
}

export default AllIncident;
