import React, { useState } from "react";
import { Option } from "../RiskInfo/Option";
import { Population } from "../RiskInfo/Population";
import { Hazard } from "../RiskInfo/Hazard";
import { Imagery } from "../RiskInfo/Imagery";
import { CriticalInfrastructure } from "../RiskInfo/CriticalInfrastructure";


function RiskInfo() {
  const [selectedPanel, setselectedPanel] = useState('population')
  
  return (
  <div>
    
    <Option selectedPanel={selectedPanel} setselectedPanel={setselectedPanel}/>
     {selectedPanel==='population'?<Population/>:''}
     {selectedPanel==='imagery'?<Imagery/>:''}
     {selectedPanel==='hazard'?<Hazard/>:''}
     {selectedPanel==='criticalinfrastructure'?<CriticalInfrastructure/>:''}

  </div>)
}
export default RiskInfo;
