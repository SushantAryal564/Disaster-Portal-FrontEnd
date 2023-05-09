import React, { useState } from "react";
import { quantile } from "simple-statistics";

const GetColor = (value, data) => {
  console.log(value, data, "Index");
  if (value >= data[0].min && value <= data[0].max) {
    return "#fdcc8a";
  } else if (value >= data[1].min && value <= data[1].max) {
    return "#fc8d59";
  } else if (value >= data[2].min && value <= data[2].max) {
    return "#e34a33";
  } else if (value >= data[3].min && value <= data[3].max) {
    return "#b30000";
  } else {
    return "#fdcc8a";
  }
};
export default GetColor;
