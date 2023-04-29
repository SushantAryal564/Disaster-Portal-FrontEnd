import React from "react";
import Header from "./Header";
import Select from "react-select";

function DataArchieve() {
  const options = [
    { value: "chocolate", label: "Buildings" },
    { value: "strawberry", label: "Disaster Event" },
    { value: "vanilla", label: "Fire Station" },
  ];
  return (
    <>
      <Header />
      <label className="p-2">Select Layer to Download</label>
      <Select options={options} className="p-2" />
      <button
        onClick={() => {}}
        className="bg-[#418fde] text-white m-2 py-[3px] px-3 rounded-sm"
      >
        Download Shapefile
      </button>{" "}
      <button
        onClick={() => {}}
        className="bg-[#418fde] text-white m-2 py-[3px] px-3 rounded-sm"
      >
        Download CSV
      </button>
    </>
  );
}

export default DataArchieve;
