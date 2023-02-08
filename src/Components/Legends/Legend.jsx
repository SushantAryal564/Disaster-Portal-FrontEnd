import React from "react";
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
        <h3 className="bg-white text-black p-1 mb-2">
          {" "}
          Real Time Module Legend
        </h3>
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
        <h3 className="bg-white text-black p-[0.5px] mb-2"> Legend</h3>
        {legendItem.map((item) => {
          return (
            <div className="m-2 flex items-center justify-between pb-1 border-b-2">
              {item}
              <img
                className="w-4"
                src={`http://127.0.0.1:8000/images/${item}.svg`}
              />
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
