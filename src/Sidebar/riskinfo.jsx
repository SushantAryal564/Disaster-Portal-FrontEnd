import React, { useState } from "react";
import { Option } from "../RiskInfo/Option";
import { Population } from "../RiskInfo/Population";
import { Hazard } from "../RiskInfo/Hazard";
import { Imagery } from "../RiskInfo/Imagery";
import { CriticalInfrastructure } from "../RiskInfo/CriticalInfrastructure";
import { useSelector } from "react-redux";


function RiskInfo() {
  // const [selectedPanel, setselectedPanel] = useState('population')
  const selectedPanel=useSelector(state=>state.riskinfo.currentpanel)
  console.log('selectedPanle',selectedPanel)
  return (
  <div>
    <Option />
     {selectedPanel==='population'?<Population/>:''}
     {selectedPanel==='imagery'?<Imagery/>:''}
     {selectedPanel==='hazard'?<Hazard/>:''}
     {selectedPanel==='criticalinfrastructure'?<CriticalInfrastructure/>:''}

  </div>)
}
export default RiskInfo;
