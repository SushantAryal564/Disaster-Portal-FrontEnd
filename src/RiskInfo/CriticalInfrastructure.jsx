import React, { useState } from "react";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import {
  InfrastructureAsyncGETThunk,
  setCriticalInfrastructure,
} from "../store/Slices/riskinfoSlice";

export const CriticalInfrastructure = () => {
  const dispatch = useDispatch();
  const infrastructureCount = useSelector(
    (state) => state.riskinfo.data.features.length
  );
  const infrastructure = useSelector(
    (state) => state.riskinfo.criticalInfrastructure
  );
  const options = [
    { value: "school", label: "School" },
    { value: "fire_station", label: "Fire Station" },
    { value: "bank", label: "Bank" },
    { value: "hospital", label: "Hospital" },
    { value: "university", label: "University" },
    { value: "hindu", label: "Temple" },
    { value: "college", label: "Collage" },
    { value: "police", label: "Police Station" },
  ];
  const [selectedOption, setSelectedOption] = useState(null);
  const handleOptionChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    dispatch(setCriticalInfrastructure(selectedOption.value));
    dispatch(InfrastructureAsyncGETThunk(selectedOption.value));
  };
  return (
    <div className="h-full scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-w-1 scrollbar-rounded-rounded-md">
      <div className=" mx-4 ">
        <div className="mt-8 mb-2 text-5xl font-serif font-medium">
          Critical Infrastructure
        </div>
        <p className="text-justify">
          All of the residential and governmental buildings, religious and
          cultural sites, banking institutions, critical infrastructures such as
          hospitals, schools, bridges in Lalitpur are at constant threat in the
          case of disaster.
        </p>
        <div className="mb-2 text-lg font-bold">Select Infrastructure</div>
        <Select
          defaultValue={"school"}
          onChange={handleOptionChange}
          options={options}
        />
        {infrastructure && (
          <div>
            <table className="border-collapse border border-slate-500 w-full mt-2">
              <tr>
                <th className="border border-slate-600">Infrastructure</th>
                <th>Count</th>
              </tr>
              <tr>
                <td className="border border-slate-600">{infrastructure}</td>
                <td className="border border-slate-600">
                  {infrastructureCount}
                </td>
              </tr>
            </table>

            <i>(source OSM)</i>
          </div>
        )}
      </div>
    </div>
  );
};
