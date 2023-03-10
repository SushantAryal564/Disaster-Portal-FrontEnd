import React, { useState } from "react";
import { Option } from "../RiskInfo/Option";
import { Population } from "../RiskInfo/Population";
import { Hazard } from "../RiskInfo/Hazard";
import { Imagery } from "../RiskInfo/Imagery";
import { CriticalInfrastructure } from "../RiskInfo/CriticalInfrastructure";
import { useSelector } from "react-redux";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Fragment } from "react";

function RiskInfo() {
  const [pageNumber, changePageNumber] = useState(1);
  const IncreaseClickHandler = () => {
    if (pageNumber == 4) {
      changePageNumber(1);
    } else {
      changePageNumber(pageNumber + 1);
    }
  };
  const DecreaseClickHandler = () => {
    if (pageNumber == 1) {
      changePageNumber(4);
    } else {
      changePageNumber(pageNumber - 1);
    }
  };
  console.log(pageNumber);
  return (
    <Fragment>
      <div className="absolute right-2 top-3">
        <ChevronLeftIcon onClick={DecreaseClickHandler} />
        <ChevronRightIcon onClick={IncreaseClickHandler} />
      </div>
      <div>
        {pageNumber === 1 ? <Population /> : ""}
        {pageNumber === 2 ? <Imagery /> : ""}
        {pageNumber === 3 ? <Hazard /> : ""}
        {pageNumber === 4 ? <CriticalInfrastructure /> : ""}
      </div>
    </Fragment>
  );
}
export default RiskInfo;
