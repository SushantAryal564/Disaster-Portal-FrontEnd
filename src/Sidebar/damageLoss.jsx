import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DamageLossAsyncGETThunk } from "../store/Slices/damageLossSlice";
import { GetChartDashboardInfo } from "../store/Slices/chartSlice";
import CustomBarChart from "../Components/Common/Chart/BarChart";

function DamageLoss({ reportActivated }) {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(DamageLossAsyncGETThunk(startDate, endDate));
  };
  const state = useSelector((state) => state.chart.status);
  useEffect(() => {
    if (state == "idle") {
      dispatch(GetChartDashboardInfo());
    }
  });
  const chartData = useSelector((state) => state.chart.data);
  console.log(chartData, "chartData");
  return (
    <div className="border-2 p-2 text-xs">
      <form onSubmit={handleSubmit}>
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
              value={startDate}
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
              value={endDate}
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
      </form>
      <div className="flex justify-evenly">
        <button
          onClick={() => {}}
          className="bg-teal-500 mt-5 text-white m-2 p-1 px-2"
        >
          Incident
        </button>
        <button
          onClick={() => {}}
          className="bg-teal-500 mt-5 text-white m-2 p-1 px-2"
        >
          Lives Lost
        </button>
        <button
          onClick={() => {}}
          className="bg-teal-500 mt-5 text-white m-2 p-1 px-2"
        >
          Property Loss
        </button>
        <button
          onClick={() => {}}
          className="bg-teal-500 mt-5 text-white m-2 p-1 px-2"
        >
          Infrastructure Damage
        </button>
      </div>
      <div className="w-full h-[500px]">
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
}

export default DamageLoss;
