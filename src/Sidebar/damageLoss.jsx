import React, { useState } from "react";

function DamageLoss() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the startDate and endDate values here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center mt-10">
        <div className="w-1/2 mr-6">
          <label
            className="block text-sm text-gray-700 font-medium mb-2"
            htmlFor="start-date"
          >
            Start Date
          </label>
          <input
            type="date"
            id="start-date"
            className="block w-full p-2 appearance-none focus:outline-none focus:border-indigo-500"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="w-1/2 mr-6">
          <label
            className="block text-sm text-gray-700 font-medium mb-2"
            htmlFor="end-date"
          >
            End Date
          </label>
          <input
            type="date"
            id="end-date"
            className="block w-full p-2 appearance-none focus:outline-none focus:border-indigo-500"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button className="bg-indigo-500 text-white text-sm py-2 px-4 rounded-lg hover:bg-indigo-600">
          Submit
        </button>
      </div>
    </form>
  );
}

export default DamageLoss;
