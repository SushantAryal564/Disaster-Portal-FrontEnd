import { width } from "@mui/system";
import React from "react";
import { Marker, Popup } from "react-leaflet";
import { useSelector } from "react-redux";
import { GetColor } from "../UI/GetColor";
export const getIcon = (disastertype) => {
  if (disastertype=='Fire'){
    return 'marker-fire'
  }
    if (disastertype=='Flood'){
      return 'marker-flood'
    } 
    return 'marker-fire'
    }
  
  
  
export const RealTimeLegend = () => {
  return (
    <div className="bg-teal-500">
      <div
        className="legend"
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          zIndex: 9999,
        }}
      >
        <h3 className="bg-white text-black p-1 mb-2"> Legend</h3>
        <p className="m-2">
          Selected Stations:{" "}
          <span className="blinking-marker-selected-legend ">
            &nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </p>

        <p className="m-2">
          Real time Station
          <span className="blinking-marker-legend ">
            &nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </p>
      </div>
    </div>
  );
};

export const DashboardLegend = ({ legendItem }) => {
  return (
    <div>
      <div
        className="legend"
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          zIndex: 9999,
        }}
      >
        <h5 className="bg-white text-black p-[0.4px] mb-2"> Legend</h5>
        {legendItem.map((item) => {
          return (
            <div className="m-2 flex items-center justify-between pb-1 border-b-2">
              <div className="flex items-center justify-start">
                <img
                className="w-4 mx-2"
                src={`http://127.0.0.1:8000/${item}.svg`}
                
              />   {item}</div>
              <div className={getIcon(item)}></div>
            
              {/* {getIcon(item)} */}
              
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const DamageAndLossLegend = ({ changeDamagestate }) => {
  return (
    <div>
      <div
        className="bg-[#ffffff]"
        style={{
          position: "absolute",
          width: "400px",
          bottom: "20px",
          left: "20px",
          zIndex: 9999,
        }}
      >
        <div className="m-2 flex justify-between pb-1 items-start">
          <div onClick={() => changeDamagestate("incident")}>Incident</div>
          <div onClick={() => changeDamagestate("peopleDeath")}>
            People death
          </div>
          <div onClick={() => changeDamagestate("estimatedLoss")}>
            Estimated loss
          </div>
          <div onClick={() => changeDamagestate("infrastructuredestroyed")}>
            Infrastructure destroyed
          </div>
        </div>
      </div>
    </div>
  );
};
export const ManageDisasterLegend = ({currenttab,disasterData}) => {
  console.log('disaster data',disasterData)
  const legendItem = new Array(
    ...new Set(useSelector((state) => state.feature.allfeature))
  );
  // console.log(legendItem);
  if (disasterData)
  var disleg=disasterData
  .map(element => element.type.title)
  .filter((title, index, array) => array.indexOf(title) === index)||[];
  console.log('asd',disleg)
  // ManageDisasterLegend()
//  const disasterData = disasterData.filter((element, index, array) => array.indexOf(element) === index);
  return (
    <div>
      <div
        className="legendd"
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          zIndex: 9999,
        }}
      >
        <h6 className="bg-white text-black p-[0.5px] mb-2 mx-2"> Legend</h6>
        {/* ANLYSIS DYAMIC LEGEND */}
        {currenttab==='disasterAnalysis'?<>
        {legendItem.map((item) => {
          let colorRGB = GetColor(item);
          let color = `rgb(${colorRGB[0]}, ${colorRGB[1]}, ${colorRGB[2]})`;
          return (
            <div className="m-2 items-center justify-between pb-1 border-b-2">
       
              <div>
                {" "}
                <span
                  style={{
                    background: color,
                    color: color,
                    width: "2px",
                    margin: "5px",
                    display: "inline",
                  }}
                >
                  sdf
                </span>
                {item[0].toUpperCase() + item.slice(1)}
              </div>
            </div>
          );
        })}
        </>:""}

        {currenttab==='manageData'?<>
        
        <div className="m-2 items-center justify-between pb-1 border-b-2">
              <div>
                {" "}
                <span
                  style={{
                    background: 'red',
                    color: 'red',
                    width: "2px",
                    margin: "5px",
                    display: "inline",
                  }}
                >
                  sdf
                </span>
                Building
              </div>
            </div>
            <div className="m-2 items-center justify-between pb-1 border-b-2">
              <div>
                {" "}
                <span
                  style={{
                    background: 'blue',
                    color: 'blue',
                    width: "2px",
                    margin: "5px",
                    display: "inline",
                  }}
                >
                  sdf
                </span>
                Selected Building
              </div>
            </div>
        
        </>:''}

      {disasterData && currenttab==='activeManage' || currenttab==='allIncidents'
      ?<>
     

      {disleg.map((item) => {
          return (
            <>
            <div className="m-2 flex items-center justify-between pb-1 border-b-2">
              <div className="flex items-center justify-start">
                <img
                className="w-4 mx-2"
                src={`http://127.0.0.1:8000/${item}.svg`}
                
              />   {item}</div>
              <div className={getIcon(item)}></div>
            
              {/* {getIcon(item)} */}
              
            </div>
            </>
          );
        })}
      </>:''}
      {disleg && disasterData && currenttab==='allincident'
      ?<>
      {disleg.map((item) => {
        console.log('JHKHKKHKKJKHkj')
          return (
            <>
            <div className="m-2 flex items-center justify-between pb-1 border-b-2">
              <div className="flex items-center justify-start">
                <img
                className="w-4 mx-2"
                src={`http://127.0.0.1:8000/${item}.svg`}
                
              />   {item}</div>
              <div className={getIcon(item)}></div>
            
              {/* {getIcon(item)} */}
              
            </div>
            </>
          );
        })}
      </>:''}

      </div>
    </div>
  );
};
export const ManageDataLegend = ({ changeDamagestate }) => {
  return (
    <div>
      <div
        className="legend"
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          zIndex: 9999,
        }}
      >
        <h6 className="bg-white text-black p-[0.5px] mb-2"> Legend</h6>
        <div className="m-2 items-center justify-between pb-1 border-b-2">
          <div>
            {" "}
            <span
              style={{
                background: "red",
                color: "red",
                width: "4px",
                margin: "5px",
                display: "inline",
              }}
            >
              sdf
            </span>
            buildings
          </div>
          <div>
            {" "}
            <span
              style={{
                background: "blue",
                color: "blue",
                width: "4px",
                margin: "5px",
                display: "inline",
              }}
            >
              sdf
            </span>
            Selected Building
          </div>
        </div>
      </div>
    </div>
  );
};


// http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=new:amenities&style=amenities

export const CriticalInfraLegend = ({  }) => {
  console.log('Critical Infrastucture LENGDN')
  const criticalInfraBuildingToggle=useSelector(state=>state.riskinfo.crticalInfraBuindingToggle)
  const amenitiesToggle=useSelector(state=>state.riskinfo.amenitiesToggle)
  return (
    <div>
      <div
        className="legend"
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          zIndex: 9999,
        }}
      >
        <h6 className="bg-white text-black p-[0.5px] mb-2"> Legend</h6>
        <div className="m-2 items-center justify-between pb-1 border-b-2">
          <div>{}
            {amenitiesToggle?<img src='http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=new:amenities&style=amenities'/>:''}
            {criticalInfraBuildingToggle?<div className="flex"><img src='http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=new:buildings&style=buildings'/></div>:''}
          </div>
        </div>
      </div>
    </div>
  );
};