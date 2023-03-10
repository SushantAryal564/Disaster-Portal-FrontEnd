import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { disasterIncidnetAsyncGETThunk } from "../store/Slices/incidentSlice";
import { AiFillInfoCircle } from "react-icons/ai";
import { BiAlarm } from "react-icons/bi";
function Incident() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.disasterIncident.status);
  useEffect(() => {
    if (status === "idle") {
      dispatch(disasterIncidnetAsyncGETThunk());
    }
  }, []);
  let disasterIncidentData = useSelector(
    (state) => state.disasterIncident.data
  );
  return (
    <React.Fragment>
      {disasterIncidentData.map((data) => {
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
}

export default Incident;
