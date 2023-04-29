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
      <div className="w-full max-w-screen-xl mx-auto">
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
  const dispatch = useDispatch();
  return (
    <div>
      <div>Pollution Live Data</div>
      <div className="flex flex-col mt-0">
        <div className="">
          <div className="py-0 inline-block min-w-full ">
            <div className="overflow-hidden bg-white">
              <div className="bg-gray-100 border-b">
                <div className="w-full bg-white border-b transition duration-300 ease-in-out  flex justify-evenly">
                  <div className="font-bold text-[11px] text-black font-light px-6 py-2 ">
                    ID
                  </div>

                  <div className="font-bold text-[11px] text-bold text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                    Station
                  </div>

                  <div className="font-bold text-[11px] text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                    Nepali Name
                  </div>

                  <div className="font-bold text-[11px] text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                    Data Source
                  </div>
                </div>
              </div>
              {data.map((instance) => {
                return (
                  <div
                    className="border-gray-300 hover:bg-gray-400"
                    onClick={() => dispatch(selectMarker(instance.id))}
                  >
                    <div
                      className={
                        instance.id == selectedMarkerId
                          ? "pl-3 w-full  cursor-pointer transition duration-300 ease-in-out bg-yellow-300 text-white flex justify-evenly "
                          : "pl-3 w-full  hover:bg-gray-200 cursor-pointer transition duration-300 ease-in-out bg-white flex justify-evenly"
                      }
                    >
                      <div className="text-[12px] text-gray-900 font-light px-8 py-2 whitespace-nowrap">
                        {instance.id}
                      </div>

                      <div className="text-[12px] text-gray-900 font-light px-10 py-2 whitespace-nowra">
                        {instance.name} Station
                      </div>

                      <div className="text-[12px] text-gray-900 font-light px-5 py-2 whitespace-nowrap">
                        {instance.nepaliName
                          ? instance.nepaliName
                          : "............"}
                      </div>

                      <div className="text-[12px] text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                        {instance.dataSource}
                      </div>
                    </div>

                    <div className="pl-12 py-2 text-[12px] text-red-400 bg-white ">
                      {instance.description}
                    </div>
                    <div className="px-9  text-[10px] text-gray-400 bg-gray-100 flex justify-end    bg-white">
                      {instance.modifiedOn}
                    </div>
                  </div>
                );
              })}
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
    <div>
      <div>River Live Data</div>
      <div className="flex flex-col mt-0">
        <div className="">
          <div className="py-0 inline-block min-w-full ">
            <div className="overflow-hidden bg-white">
              <div className="bg-gray-100 border-b">
                <div className="w-full bg-white border-b transition duration-300 ease-in-out  flex justify-evenly">
                  <div className="font-bold text-[11px] text-black font-light px-6 py-2 ">
                    ID
                  </div>

                  <div className="font-bold text-[11px] text-bold text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                    Station at
                  </div>

                  <div className="font-bold text-[11px] text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                    Warning Level
                  </div>

                  <div className="font-bold text-[11px] text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                    Danger Level
                  </div>
                </div>
              </div>

              {data2.map((instance) => {
                return (
                  <div
                    className={
                      instance.id == selectedMarkerId
                        ? "border-gray-300 bg-yellow-500"
                        : "border-gray-300 hover:bg-gray-400"
                    }
                    onClick={() => dispatch(selectMarker(instance.id))}
                  >
                    <div
                      className={
                        instance.id == selectedMarkerId
                          ? "pl-3 w-full  cursor-pointer transition duration-300 ease-in-out bg-yellow-300 text-white flex justify-evenly "
                          : "pl-3 w-full  hover:bg-gray-200 cursor-pointer transition duration-300 ease-in-out bg-white flex justify-evenly"
                      }
                    >
                      <div className="text-[12px] text-gray-900 font-light px-1 py-4 whitespace-nowrap ">
                        {instance.id}
                      </div>

                      <div className="text-[12px] text-gray-900 font-light pl-7 py-4 whitespace-nowra">
                        {instance.title}
                      </div>

                      <div className="text-[12px] text-gray-900 font-light px-2 py-4 whitespace-nowrap pl-10 pr-10">
                        {instance.warningLevel
                          ? instance.warningLevel
                          : "............"}
                      </div>

                      <div className="text-[12px] text-gray-900 font-light px-2 py-4 whitespace-nowrap pl-10 pr-10">
                        {instance.dangerLevel}
                      </div>
                    </div>

                    <div className="pl-12 py-1 text-[12px] text-red-400 bg-white ">
                      {instance.status}
                    </div>
                    <div className="px-9  text-[10px] text-gray-400 bg-gray-100 flex justify-end bg-white">
                      {instance.modifiedOn}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
