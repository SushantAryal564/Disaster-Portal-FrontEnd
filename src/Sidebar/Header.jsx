import React from "react";
import logo from '../../src/assests/LMC.png'
const header = ({ wardID }) => {
  return (
    <div className="flex justify-between items-center px-3 py-2 bg-[#e35163]">
      
      <div className=" text-white text-3xl font-serif font-medium">DIMS</div>
      <div className="text-white text-xl font-serif">
        {`Lalitpur Metropolitian ${wardID ? `Ward ${wardID}` : ""}`}
      </div>
    </div>
  );
};

export default header;
