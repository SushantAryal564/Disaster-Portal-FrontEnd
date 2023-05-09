import { width } from "@mui/system";
import React from "react";
import { Marker, Popup } from "react-leaflet";
import { useSelector } from "react-redux";
import { GetColor } from "../UI/GetColor";
import { useDispatch } from "react-redux";
import { changeDamageAndLossTab } from "../../store/Slices/chartSlice";

export const getIcon = (disastertype) => {
  if (disastertype == "Fire") {
    return "marker-fire";
  }
  if (disastertype == "Flood") {
    return "marker-flood";
  }
  return "marker-fire";
};

export const RealTimeLegend = () => {
  return (
    <div className="w-full">
      <div
        className="legend"
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          zIndex: 9999,
        }}
      >
        <h3 className="bg-white text-black p-1 mb-2 text-base"> Legend</h3>
        <p className="m-2">
          Selected Stations:
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
  console.log(legendItem, "I am manageData");
  const Icon = ({ legendItem }) => {
    let icon = (
      <div
        className="marker-fire-two flex justify-center items-center"
        style={{
          borderRadius: "50%",
          backgroundColor: `${legendItem.is_verified ? "#fafd34" : "#ffb938"}`,
          padding: "2px",
          border: "none",
        }}
      >
        <img src={legendItem.url} style={{ width: "20px", height: "20px" }} />
      </div>
    );

    return icon;
  };
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
        <div className="flex gap-2 mb-3">
          <div className="flex gap-1">
            <div className="w-4 h-4 bg-[#fafd34] border"></div>
            <div className="text-xs"> Verified</div>
          </div>
          <div className="flex gap-1">
            <div className="w-4 h-4 bg-[#ffb938] border"></div>
            <div className="text-xs"> Not Verified</div>
          </div>
        </div>
        <div>
          {legendItem.map((item) => {
            return (
              <div className="m-2 pb-1 border-b-2">
                <div className=" w-full flex items-center justify-between">
                  <div className="h-5 w-5">
                    <Icon legendItem={item} />
                  </div>
                  <div className="text-sm">{item.title}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const IncidentLegend = ({ legendItem }) => {
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
        <div className="flex justify-center items-center gap-3">
          <div className="w-5 h-5 bg-[#e62727] rounded-full"></div>
          <div>Disaster</div>
        </div>
      </div>
    </div>
  );
};

export const RiskInfoLegend = () => {
  const currentPanel = useSelector((state) => state.riskinfo.currentpanel);
  let image = "";
  if (currentPanel == "1") {
    image =
      "http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=Lalitpur:PopulationLalitpurMetro_final";
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
          <img src={image} />
        </div>
      </div>
    );
  }
  if (currentPanel == "2") {
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
          <div className="flex flex-col gap-1">
            <div className="flex gap-3">
              <div className="w-4 h-4 bg-[#2777ec]"></div>
              <div className="text-xs font-medium">WaterBody</div>
            </div>
            <div className="flex gap-3">
              <div className="w-4 h-4 bg-[#498828]"></div>
              <div className="text-xs font-medium">Forest</div>
            </div>
            <div className="flex gap-3">
              <div className="w-4 h-4 bg-[#ea2a2b]"></div>
              <div className="text-xs font-medium">Built-up</div>
            </div>
            <div className="flex gap-3">
              <div className="w-4 h-4 bg-[#ffff2c]"></div>
              <div className="text-xs font-medium">Crop Land</div>
            </div>
            <div className="flex gap-3">
              <div className="w-4 h-4 bg-[#c6fdaf]"></div>
              <div className="text-xs font-medium">Grassland</div>
            </div>
            <div className="flex gap-3">
              <div className="w-4 h-4 bg-[#69e52e]"></div>
              <div className="text-xs font-medium">Woodenland</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export const DamageAndLossLegend = ({ changeDamagestate }) => {
  const dispatch = useDispatch();
  const currentDamageState = useSelector((state) => state.chart.tab);
  const disasterClass = useSelector(
    (state) => state.damageloss.disasterClasses
  );
  const lossClass = useSelector((state) => state.damageloss.LossClass);
  const peopleDeathClass = useSelector(
    (state) => state.damageloss.PeopleDeathClass
  );
  const infrastructureClass = useSelector(
    (state) => state.damageloss.InfrastructureClass
  );
  const getMapLegend = (legendClass) => {
    return (
      <div
        className="bg-[#ffffff] p-2"
        style={{
          position: "absolute",
          width: "150px",
          bottom: "5px",
          right: "5px",
          zIndex: 9999,
        }}
      >
        <h5 className="bg-white text-black p-[0.4px] mb-2"> Legend</h5>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="h-4 w-4 bg-[#b30000]"></div>
            <div>
              {legendClass[3].min >= 10000000
                ? (legendClass[3].min / 1000000).toFixed(1) + "M"
                : legendClass[3].min}{" "}
              &nbsp; - &nbsp;
              {legendClass[3].max >= 10000000
                ? (legendClass[3].max / 1000000).toFixed(1) + "M"
                : legendClass[3].max}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="h-4 w-4 bg-[#e34a33]"></div>
            <div>
              {legendClass[2].min >= 10000000
                ? (legendClass[2].min / 1000000).toFixed(1) + "M"
                : legendClass[2].min}{" "}
              &nbsp; - &nbsp;
              {legendClass[2].max >= 10000000
                ? (legendClass[2].max / 1000000).toFixed(1) + "M"
                : legendClass[2].max}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="h-4 w-4 bg-[#fc8d59]"></div>
            <div>
              {legendClass[1].min >= 1000000
                ? (legendClass[1].min / 1000000).toFixed(1) + "M"
                : legendClass[1].min}
              &nbsp; - &nbsp;
              {legendClass[1].max >= 1000000
                ? (legendClass[1].max / 1000000).toFixed(1) + "M"
                : legendClass[1].max}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="h-4 w-4 bg-[#fdcc8a]"></div>
            <div>
              {legendClass[0].min >= 1000000
                ? (legendClass[0].min / 1000000).toFixed(1) + "M"
                : legendClass[0].min}
              &nbsp; - &nbsp;
              {legendClass[0].max >= 1000000
                ? (legendClass[0].max / 1000000).toFixed(1) + "M"
                : legendClass[0].max}
            </div>
          </div>
        </div>
      </div>
    );
  };
  let currentLegend;
  switch (currentDamageState) {
    case "INCIDENT":
      currentLegend = getMapLegend(disasterClass);
      break;
    case "LIVES_LOST":
      currentLegend = getMapLegend(peopleDeathClass);
      break;
    case "PROPERTY_LOSS":
      currentLegend = getMapLegend(lossClass);
      break;
    case "INFRASTRUCTURE_DAMAGE":
      currentLegend = getMapLegend(infrastructureClass);
      break;
    default:
      currentLegend = getMapLegend(disasterClass);
  }
  return (
    <div>
      <div
        className="bg-[#ffffff] rounded-md"
        style={{
          position: "absolute",
          width: "387px",
          top: "20px",
          left: "30%",
          zIndex: 9999,
        }}
      >
        <div className="font-bold flex items-start shadow">
          <div
            onClick={() => dispatch(changeDamageAndLossTab("INCIDENT"))}
            className={`p-2 ${
              currentDamageState == "INCIDENT" && "bg-[#fde38d]"
            }`}
          >
            Incident
          </div>
          <div
            onClick={() => dispatch(changeDamageAndLossTab("LIVES_LOST"))}
            className={`border-l-2 h-[100%] p-2
            ${currentDamageState == "LIVES_LOST" && "bg-[#fde38d]"}
            }`}
          >
            Lives Lost
          </div>
          <div
            onClick={() => dispatch(changeDamageAndLossTab("PROPERTY_LOSS"))}
            className={`border-l-2 h-[100%] p-2  ${
              currentDamageState == "PROPERTY_LOSS" && "bg-[#fde38d]"
            }
          }`}
          >
            Property loss
          </div>
          <div
            onClick={() =>
              dispatch(changeDamageAndLossTab("INFRASTRUCTURE_DAMAGE"))
            }
            className={`border-l-2 h-[100%] p-2
            ${currentDamageState == "INFRASTRUCTURE_DAMAGE" && "bg-[#fde38d]"}
            `}
          >
            Infrastructure Damaged
          </div>
        </div>
      </div>
      {currentLegend}
    </div>
  );
};
export const ManageDisasterLegend = ({ currenttab, disasterData }) => {
  console.log(disasterData, "I am disasterDAta");
  const legendItem = new Array(
    ...new Set(useSelector((state) => state.feature.allfeature))
  );
  if (disasterData)
    var disleg =
      disasterData
        .map((element) => element?.type?.title || "update type ")
        .filter((title, index, array) => array.indexOf(title) === index) || [];
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
        {currenttab === "disasterAnalysis" ? (
          <>
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
          </>
        ) : (
          ""
        )}

        {currenttab === "manageData" ? (
          <>
            <div className="m-2 items-center justify-between pb-1 border-b-2">
              <div>
                {" "}
                <span
                  style={{
                    background: "red",
                    color: "red",
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
                    background: "blue",
                    color: "blue",
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
          </>
        ) : (
          ""
        )}

        {(disasterData && currenttab === "activeManage") ||
        currenttab === "allincident" ? (
          <>
            {disleg?.map((item) => {
              return (
                <>
                  <div className="m-2 flex items-center justify-between pb-1 border-b-2">
                    <div className="flex items-center justify-start">
                      <img
                        className="w-4 mx-2"
                        src={`http://127.0.0.1:8000/${item}.svg`}
                      />{" "}
                      {item}
                    </div>
                    <div className={getIcon(item)}></div>

                    {/* {getIcon(item)} */}
                  </div>
                </>
              );
            })}
          </>
        ) : (
          ""
        )}
        {disleg && disasterData && currenttab === "allincident" ? (
          <>
            {disleg?.map((item) => {
              return (
                <>
                  <div className="m-2 flex items-center justify-between pb-1 border-b-2">
                    <div className="flex items-center justify-start">
                      <img
                        className="w-4 mx-2"
                        src={`http://127.0.0.1:8000/${item}.svg`}
                      />{" "}
                      {item}
                    </div>
                    <div className={getIcon(item)}></div>

                    {/* {getIcon(item)} */}
                  </div>
                </>
              );
            })}
          </>
        ) : (
          ""
        )}
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
