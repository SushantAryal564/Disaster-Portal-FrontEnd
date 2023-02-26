import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BuildingAsyncGETThunk } from "../../store/Slices/buildingSlice";

function ManageData() {
  const dispatch = useDispatch();
  const [building, setBuilding] = useState();
  const wardID = localStorage.getItem("WardId");
  useEffect(() => {
    dispatch(BuildingAsyncGETThunk(wardID));
  }, [wardID]);

  return <>Manage data</>;
}

export default ManageData;
