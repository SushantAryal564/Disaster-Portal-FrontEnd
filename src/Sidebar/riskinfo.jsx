import React, { useState } from "react";
import { Demography } from "../RiskInfo/Demography.jsx";
import { Imagery } from "../RiskInfo/Imagery";
import { CriticalInfrastructure } from "../RiskInfo/CriticalInfrastructure";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setpanel } from "../store/Slices/riskinfoSlice";
import Header from "./Header";
function RiskInfo() {
  const currentPanel = useSelector((state) => state.riskinfo.currentpanel);
  const dispatch = useDispatch();

  console.log(currentPanel);
  const IncreaseClickHandler = () => {
    if (currentPanel == 3) {
      dispatch(setpanel(1));
    } else {
      dispatch(setpanel(currentPanel + 1));
    }
  };
  const DecreaseClickHandler = () => {
    if (currentPanel == 1) {
      dispatch(setpanel(3));
    } else {
      dispatch(setpanel(currentPanel - 1));
    }
  };
  return (
    <Fragment>
        <div className=" p-3 text-sm bg-[#e35163] text-white"> Damage and Loss</div>
      <Header />
      <div className="absolute right-2 top-3">
        <ChevronLeftIcon onClick={DecreaseClickHandler} />
        <ChevronRightIcon onClick={IncreaseClickHandler} />
      </div>
      <div>
        {currentPanel === 1 ? <Demography /> : ""}
        {currentPanel === 2 ? <Imagery /> : ""}
        {currentPanel === 3 ? <CriticalInfrastructure /> : ""}
      </div>
    </Fragment>
  );
}
export default RiskInfo;
