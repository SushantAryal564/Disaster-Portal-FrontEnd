import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { AiFillInfoCircle } from "react-icons/ai";
import { BiAlarm } from "react-icons/bi";
import { disasterAsyncGETThunk } from "../store/Slices/disasterSlice";
import { useDispatch } from "react-redux";
import LMC from "./../assests/LMC.png";
function Dashboard({ reportActivated }) {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.disaster.status);
  useEffect(() => {
    // if (status === "idle") {
    dispatch(disasterAsyncGETThunk());
    // }
  }, [reportActivated]);
  const disasterData = useSelector((state) => {
    return state.disaster.data;
  });
  return (
    <React.Fragment>
      <div className="flex justify-between items-center px-3 py-2 bg-[#e35163]">
        <div className=" text-white text-3xl font-serif font-medium">DIMS</div>
        <div className="text-white text-xl font-serif">
          Lalitpur Metropolitan City
        </div>
      </div>
      {disasterData.map((data) => {
        return (
          <div className=" border-gray-200 border-b-2 p-1 hover:bg-gray-200 py-2  ">
            <div className="text-md font-medium flex flex-row ">
              <div className="text-red-500 text-sm flex flex-col">
                <span className="px-3">
                  {" "}
                  <img
                    className="w-9 h-6 pt-1 mt-1 text-red-500"
                    src={`http://127.0.0.1:8000/${data?.type?.title}.svg`}
                    alt={data}
                  />
                </span>
                <p className="text-xs text-black mx-6 my-1">
                  {data?.type?.title || "none"}
                </p>
              </div>
              <span className="font-normal ml-2 mt-1 pt-1 text-sm">
                <div className="font-semibold text-xs"> {data.name}</div>
                <div>
                  <div className="text-xs text-gray-500 flex justify-start ">
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
                        {data.address || "Dhapakhel,Gems School"}
                      </span>
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

export default Dashboard;
