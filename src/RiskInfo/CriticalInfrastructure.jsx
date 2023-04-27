import React, { useState } from "react";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { InfrastructureAsyncGETThunk } from "../store/Slices/riskinfoSlice";

export const CriticalInfrastructure = () => {
  const dispatch = useDispatch();
  const options = [
    { value: "school", label: "School" },
    { value: "fire_station", label: "Fire Station" },
    { value: "bank", label: "Bank" },
    { value: "hospital", label: "Hospital" },
    { value: "bank", label: "Bank" },
  ];
  return (
    <div>
      {options.map((option) => (
        <div
          onClick={() => {
            dispatch(InfrastructureAsyncGETThunk(option.value));
          }}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
};
