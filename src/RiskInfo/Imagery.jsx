import React from "react";
import HollowPieChart from "../Components/Common/Chart/HollowPieChart";

export const Imagery = () => {
  const data = [
    { name: "WaterBody", value: 0.07824 },
    { name: "Forest", value: 2.349633 },
    { name: "BuiltUp Area", value: 60.59968 },
    { name: "Cropland", value: 35.40342 },
    { name: "GrassLand", value: 1.557457 },
    { name: "Wooden Land", value: 0.041565 },
  ];
  return (
    <div className="px-4 h-[83vh] overflow-x-scroll scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-w-1 scrollbar-rounded-rounded-md">
      <div className="mt-8 text-5xl font-serif font-medium"> Land Cover</div>
      <div className=" mt-4 text-justify">
        <p>
          The WaterBody covers 0.07824% of the area. The Forest covers 2.349633%
          of the area. The Built-Up Area covers the largest portion of the area,
          accounting for 60.59968%. The Cropland covers 35.40342% of the area.
          The Grassland covers 1.557457% of the area, and the Wooden Land covers
          only 0.041565%.<i className="text-sm">(source: ICIMOD)</i>
        </p>
      </div>
      <div className="w-[100%] h-[400px]">
        <HollowPieChart data={data} />
      </div>
    </div>
  );
};
