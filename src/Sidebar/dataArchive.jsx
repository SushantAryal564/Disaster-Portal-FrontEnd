import React, { useEffect, useState } from "react";
import Header from "./Header";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  clearWard,
  cleardData,
  getWarddownloadbuilding,
  getdateselectedEvents,
} from "../store/Slices/selecteddata";

function DataArchieve() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [wards, setWard] = useState();
  const wardJSON = async () => {
    let data = await fetch("http://127.0.0.1:8000/api/v1/spatial/ward/");
    let datajson = await data.json();
    setWard(datajson);
  };
  useEffect(() => {
    wardJSON();
  }, []);
  console.log(wards, "I am ward what are you");
  const options1 = wards?.features?.map((ward) => {
    return {
      value: ward.id,
      label: "Ward" + ward.properties.ward,
    };
  });
  const handlestart = (e) => {
    setStartDate(e.target.value);
  };

  const handleend = (e) => {
    setEndDate(e.target.value);
  };

  const [selectedwardbuilding, setWardb] = useState(null);
  const dispatch = useDispatch();
  const [ddata, setddata] = useState(null);
  console.log(ddata);
  useEffect(() => {
    if (selectedwardbuilding)
      dispatch(getWarddownloadbuilding(selectedwardbuilding));
    else {
      dispatch(clearWard());
    }
  }, [selectedwardbuilding]);

  const dedata = useSelector((state) => state.selected.dateselectedevent);
  useEffect(() => {
    if (startDate && endDate) {
      dispatch(getdateselectedEvents([startDate, endDate]));
    }
  }, [startDate, endDate]);
  console.log(dedata, "MILYO");
  const wardStyle = () => {
    return {
      fillColor: `none`,
      opacity: 1,
      weight: 2,
      color: "black",
      fillOpacity: 0.7,
    };
  };
  const [selectedWard, changeSelectedWard] = useState(null);
  return (
    <>
      <Header />
      <div className="px-3">
        <div className="text-center font-bold mt-3 text-lg">
          Download Spatial Data
        </div>
        <div className="border rounded-sm shadow-md mt-2">
          <div className="ml-2 mt-2 font-bold">Download Building data</div>
          <div className="ml-2">Select Ward</div>
          <Select
            options={options1}
            value={selectedWard}
            className="p-2"
            onChange={(event) => {
              setWardb(event.value);
              changeSelectedWard(event);
            }}
          />
          <div className="flex">
            <div>
              <button
                onClick={() => {
                  let downloadUrl =
                    "http://localhost:8000/api/v1/analysis/download_building/?ward=" +
                    selectedwardbuilding;
                  console.log("dsa");
                  window.location.href = downloadUrl;
                }}
                className="bg-[#418fde] text-sm text-white m-2 py-[3px] px-3 rounded-sm mb-4"
              >
                Download Shapefile
              </button>
            </div>
            <div>
              <button
                className="bg-red-500 text-sm text-white m-2 py-[3px] px-3 rounded-sm mb-4"
                onClick={() => {
                  changeSelectedWard(null);
                  dispatch(clearWard());
                }}
              >
                Clear selection
              </button>
            </div>
          </div>
        </div>
        <div className="border rounded-sm shadow-md mt-4">
          <div className="ml-2 font-bold">Download Disaster data</div>
          <span className="text-md ml-2"> Filter Disaster data</span>
          <div>
            <div className="flex  mt-1">
              <div className="m-2">
                <label
                  htmlFor="incidentOn1"
                  className="text-xs leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-red-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight font-bold"
                >
                  Start Date
                </label>
                <input
                  className=" peer h-8 w-full border-b border-blue-gray-200 bg-transparent  font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:border-red-500 focus:outline-0 disabled:border-8 disabled:bg-blue-gray-50 hover:text-black "
                  id="incidentOn1"
                  name="incidentOn1"
                  type="date"
                  onChange={handlestart}
                  value={startDate}
                />
              </div>

              <div className="m-2">
                <label
                  htmlFor="incidentOn"
                  className="text-xs font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-red-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight font-bold"
                >
                  End Date
                </label>
                <input
                  className=" peer h-8 w-full border-b border-blue-gray-200 bg-transparent  font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:border-red-500 focus:outline-0 disabled:border-8 disabled:bg-blue-gray-50 hover:text-black "
                  id="incidentOn"
                  name="incidentOn"
                  type="date"
                  onChange={handleend}
                  value={endDate}
                />
              </div>
            </div>

            <div className="pb-8">
              <button
                onClick={() => {
                  let downloadUrl =
                    "http://localhost:8000/api/v1/analysis/download_disaster/?fromdate=" +
                    startDate +
                    "&todate=" +
                    endDate;
                  console.log(downloadUrl);
                  window.location.href = downloadUrl;
                }}
                className="bg-[#418fde] text-white m-2 py-[3px] px-3 rounded-sm text-sm"
              >
                Download Shapefile
              </button>
              <button
                className="bg-red-500 text-white m-2 py-[3px] px-3 rounded-sm text-sm"
                onClick={() => dispatch(cleardData())}
              >
                Clear selection
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DataArchieve;
