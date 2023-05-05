import React, { useEffect } from "react";
import { BiWater } from "react-icons/bi";
import { GiFactory } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";

import {
  LivePollutionDataAsyncGETThunk,
  WaterDataAsyncGETThunk,
} from "../store/Slices/livedataSlice";
import { selectMarker } from "../store/Slices/selecteddata";

export const LiveData = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.live.pollution);
  const data2 = useSelector((state) => state.live.water);

  const status2 = useSelector((state) => state.live.status);

  useEffect(() => {
    if (status2 === "idle") {
      dispatch(LivePollutionDataAsyncGETThunk());
      dispatch(WaterDataAsyncGETThunk());
    }
  }, [dispatch, status2]);

  const selectedMarkerId = useSelector(
    (state) => state.selected.selectedMarkerId
  );
  return (
    <>
      <Header />
      <div className="w-full max-w-screen-xl mx-auto px-4 h-[83vh] overflow-x-scroll scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-w-1 scrollbar-rounded-rounded-md">
        {data[0]?.results && data2[0]?.results ? (
          <div className="">
            <Water
              data2={data2[0].results}
              selectedMarkerId={selectedMarkerId}
            ></Water>
            <Pollution
              data={data[0].results}
              selectedMarkerId={selectedMarkerId}
            ></Pollution>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
export const Pollution = ({ data, selectedMarkerId }) => {
  console.log(data, "data2");
  const dispatch = useDispatch();
  return (
    <div>
      <div className="text-lg py-2 font-serif mx-2">Live Pollution Data</div>
      <p className="mx-2">
        Real-time pollution data is typically collected using sensors that
        measure parameters such as dissolved oxygen, pH, temperature, and the
        levels of pollutants such as nitrogen and phosphorus. This data is then
        transmitted to a central database, where it can be analyzed and used to
        make management decisions
      </p>
      <div className="flex flex-col mt-0 mx-2">
        <div className="">
          <div className="py-0 inline-block min-w-full ">
            <div className="overflow-hidden bg-white">
              <table className="w-full border-collapse border border-slate-500	 ">
                <tr className="border-1">
                  <th className="py-1 px-1 border border-slate-600">Station</th>
                  <th className="py-1 px-1 border border-slate-600">
                    Air Quality(aqi)
                  </th>
                </tr>
                {data.map((instance) => {
                  console.log(instance, "air quality instance");
                  return (
                    <tr
                      className={
                        instance.id === selectedMarkerId && "bg-[#418fde]"
                      }
                      style={{ backgroundColor: instance.aqiColor }}
                      onClick={() => dispatch(selectMarker(instance.id))}
                    >
                      <td className="py-1 px-1 border border-slate-600">
                        {instance.name} Station
                      </td>
                      <td className="py-1 px-1 border border-slate-600">
                        {instance.aqi.toFixed(3)}
                      </td>
                    </tr>
                  );
                })}
              </table>
              <i>(Data source:pollution.gov.np)</i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Water = ({ data2, selectedMarkerId }) => {
  const dispatch = useDispatch();
  return (
    <div className="mb-2">
      <div className=" mx-2 text-lg font-serif py-2">Live Riverflow Data</div>
      <p className="text-justify mx-2">
        Real-time river flow data is collected using a variety of techniques,
        including gauges that measure the water level and velocity, and acoustic
        sensors that can estimate flow rates. This data can be used to monitor
        water availability and quality, forecast flood events, and manage water
        resources.
      </p>
      <div className="flex flex-col mt-0">
        <table className=" mx-2 border-collapse border border-slate-500	">
          <tr className="border-1">
            <th>Station</th>
            <th>Water Level</th>
          </tr>
          {data2.map((instance) => {
            return (
              <tr
                className={
                  instance.id == selectedMarkerId
                    ? "bg-[#418fde]"
                    : `${
                        instance.status === "BELOW WARNING LEVEL"
                          ? "bg-[#00e400]"
                          : "bg-[#ff0000]"
                      }`
                }
                onClick={() => dispatch(selectMarker(instance.id))}
              >
                <td className=" py-1 px-1 border border-slate-600">
                  {instance.title}
                </td>
                <td className="py-1 px-1 border border-slate-600">
                  {instance?.waterLevel.toFixed(2)}
                </td>
              </tr>
            );
          })}
        </table>
        <i className="mx-2">(Data source: hydrology.gov.np)</i>
      </div>
    </div>
  );
};
