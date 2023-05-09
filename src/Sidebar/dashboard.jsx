import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { AiFillInfoCircle } from "react-icons/ai";
import { BiAlarm } from "react-icons/bi";
import { disasterAsyncGETThunk } from "../store/Slices/disasterSlice";
import { DamageLossAsyncGETThunk } from "../store/Slices/damageLossSlice";
import { useDispatch } from "react-redux";
import Header from "./Header";
import VerifiedIcon from "@mui/icons-material/Verified";

function Dashboard({ reportActivated }) {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.disaster.status);
  useEffect(() => {
    // if (status === "idle") {
    dispatch(disasterAsyncGETThunk());
    dispatch(DamageLossAsyncGETThunk());
    // }
  }, [reportActivated]);
  const disasterData = useSelector((state) => {
    return state.disaster.data;
  });
  return (
    <div className="scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-w-1 scrollbar-rounded-rounded-md">
      <Header />
      <div className="w-full max-w-screen-xl mx-auto px-4 h-[83vh] overflow-x-scroll scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-w-1 scrollbar-rounded-rounded-md">
        {disasterData.map((data) => {
          return (
            <div className=" border-gray-200 border-b-2 p-1 hover:bg-gray-200 py-2  ">
              <div className="text-md font-medium flex flex-row ">
                <div className="text-red-500 text-sm flex flex-col justify-center items-center w-20">
                  <div className="px-3">
                    <img
                      className="w-9 h-6 pt-1 mt-1 text-red-500"
                      src={`http://127.0.0.1:8000/${data?.type?.title}.svg`}
                      alt={data}
                    />
                  </div>
                  <p className="text-xs text-black mx-6 my-1">
                    {data?.type?.title || "none"}
                  </p>
                </div>
                <div className="font-normal ml-2 mt-1 pt-1 text-sm">
                  <div className="font-semibold flex items-center gap-1">
                    <div className="text-base">{data.name}</div>
                    {data.is_verified && (
                      <VerifiedIcon
                        style={{
                          color: "#418fde",
                          width: "20px",
                          height: "20px",
                        }}
                      />
                    )}
                  </div>
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
                        <span className="ml-2">WARD-{data.Ward}</span>
                        <span className="ml-3">
                          {data.address || "Dhapakhel,Gems School"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
