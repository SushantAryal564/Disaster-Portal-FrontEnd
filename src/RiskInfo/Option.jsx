import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setpanel } from "../store/Slices/riskinfoSlice";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
export const Option = () => {
  const dispatch = useDispatch();
  const currentPanel = useSelector((state) => {
    return state.riskinfo.currentPanel;
  });
  const IncreaseClickHandler = () => {
    if (currentPanel == 4) {
      dispatch(setpanel(1));
    }
    dispatch(setpanel(currentPanel + 1));
  };
  const DecreaseClickHandler = () => {
    if (currentPanel == 1) {
      dispatch(setpanel(4));
    }
    dispatch(setpanel(currentPanel - 1));
  };
  return (
    <div className="absolute right-0 pr-3">
      <ChevronLeftIcon onClick={DecreaseClickHandler} />
      <ChevronRightIcon onClick={IncreaseClickHandler} />
    </div>
  );
};
