import React, { useState } from "react";

function DamageLoss() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  
  console.log(startDate,endDate)
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the startDate and endDate values here
  };

  return (
    <div className="border-2 p-2 text-xs">
    <form onSubmit
    ={handleSubmit}>
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
        <button onClick={handleSubmit} className="bg-teal-500 mt-5 text-white p-1">Submit</button>
      </div>
    </form>
    <div className="flex justify-evenly">
      <button onClick={()=>{}} className="bg-teal-500 mt-5 text-white m-2 p-1 px-2">Incident</button>
      <button onClick={()=>{}} className="bg-teal-500 mt-5 text-white m-2 p-1 px-2">Lives Lost</button>
      <button onClick={()=>{}} className="bg-teal-500 mt-5 text-white m-2 p-1 px-2">Property Loss</button>
      <button onClick={()=>{}} className="bg-teal-500 mt-5 text-white m-2 p-1 px-2">Infrastructure Damage</button>
      </div>
    </div>
  );
}

export default DamageLoss;
