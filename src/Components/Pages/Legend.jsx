import React from 'react'

export const RealTimeLegend = () => {
  return (
     <div className="bg-teal-500 w-96">
     <div
       className="legend"
       style={{ position: "absolute", bottom: "20px", right: "20px",zIndex: 9999}}
     >
       <h3 className="bg-white text-black p-1 mb-2"> Real Time Module Legend</h3>
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
  )
}
