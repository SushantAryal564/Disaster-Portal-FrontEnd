import React from "react";
import LMC from '../../src/assests/a.png'
const header = ({ wardID }) => {
  return (
    <div className="flex justify-between items-center text-black px-3 border-b-2 border-gray-100">
    <div className="text-white text-xl font-sans ">
      <div className="flex flex-start"><img  className='h-20 mt-3' src={LMC}></img>
      <div className="text-sm flex flex-cols justify-center mx-3" ><p className="text-xl text-black mt-4">Lalitpur Metropolitan city,
      <br/><p className="align-baseline">Bagmati Pradesh, Lalitpur</p>
      <div className=" text-black text-xs font-medium italic align-baseline ">Disaster Information Management System</div> 
      </p>
      
      </div>
      
      </div>
      </div>
    {/* <div className=" text-black text-sm font-serif font-medium">Disaster Information Management System</div> */}
      
    </div>
  );
};

export default header;
