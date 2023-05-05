import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DamageLossAsyncGETThunk } from "../store/Slices/damageLossSlice";
import { GetChartDashboardInfo } from "../store/Slices/chartSlice";
import CustomBarChart from "../Components/Common/Chart/BarChart";
import { changeDamageAndLossTab } from "../store/Slices/chartSlice";

import Header from "./Header";
function DamageLoss({ reportActivated }) {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  console.log(startDate, endDate, "in damageLoss");
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(DamageLossAsyncGETThunk([startDate, endDate]));
  };
  const state = useSelector((state) => state.chart.status);
  useEffect(() => {
    dispatch(DamageLossAsyncGETThunk());
    if (state == "idle") {
      dispatch(GetChartDashboardInfo());
    }
  }, [reportActivated]);
  let chartData = useSelector((state) => state.chart.data);
  const damageTab = useSelector((state) => state.chart.tab);
  return (
    <>
      <Header />
      <div className="border-2 p-2 text-xs  h-[85vh] overflow-x-scroll scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-w-1 scrollbar-rounded-rounded-md">
        <div className="flex justify-evenly">
          <button
            onClick={() => {
              dispatch(changeDamageAndLossTab("INCIDENT"));
            }}
            className="bg-[#418fde] text-white m-2 py-[3px] px-3 rounded-sm"
          >
            Incident
          </button>
          <button
            onClick={() => {
              dispatch(changeDamageAndLossTab("LIVES_LOST"));
            }}
            className="bg-[#418fde] text-white m-2 py-[3px] px-3 rounded-sm"
          >
            Lives Lost
          </button>
          <button
            onClick={() => {
              dispatch(changeDamageAndLossTab("PROPERTY_LOSS"));
            }}
            className="bg-[#418fde] text-white m-2 py-[3px] px-3 rounded-sm"
          >
            Property Loss
          </button>
          <button
            onClick={() => {
              dispatch(changeDamageAndLossTab("INFRASTRUCTURE_DAMAGE"));
            }}
            className="bg-[#418fde] text-white m-2 py-[3px] px-3 rounded-sm"
          >
            Infrastructure Damage
          </button>
        </div>
        <div className="w-full h-[580px]">
          {damageTab === "INCIDENT" && (
            <>
              <h1 className="text-center text-base font-bold mt-3">
                Total Incident in Each Ward
              </h1>
              <CustomBarChart
                data={chartData}
                dataKey="number_of_disasters"
                name="Number Of Disasters"
              />
            </>
          )}
          {damageTab === "LIVES_LOST" && (
            <>
              <h1 className="text-center text-base font-bold mt-3">
                Total People Death in Each Ward
              </h1>{" "}
              <CustomBarChart
                data={chartData}
                dataKey="total_people_death"
                name="Total People Death"
              />
            </>
          )}
          {damageTab === "PROPERTY_LOSS" && (
            <>
              <h1 className="text-center text-base font-bold mt-3">
                Total Property Loss in Each Ward
              </h1>{" "}
              <CustomBarChart
                data={chartData}
                dataKey="total_estimated_loss"
                name="Damaged Property"
              />
            </>
          )}
          {damageTab === "INFRASTRUCTURE_DAMAGE" && (
            <>
              <h1 className="text-center text-base font-bold mt-3">
                Total Infrastructure Damage in Each Ward
              </h1>{" "}
              <CustomBarChart
                data={chartData}
                dataKey="total_infrastructure_damaged"
                name="Infrastructure Damaged"
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default DamageLoss;
