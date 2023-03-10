import React, { Fragment } from "react";

export const Deomography = () => {
  return (
    <div className=" mx-4 scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-w-1 scrollbar-rounded-rounded-md">
      <div className="mt-8 text-5xl font-serif font-medium"> Demography</div>
      <div className=" mt-4 text-justify">
        <p>
          Lalitpur Metropolitan City, is the fourth most populous city of
          Nepal.The majority of the region is urbanized and has a high
          population density.{" "}
        </p>
        <p>
          At the time of the 2011 Nepal census, Lalitpur Municipality has a
          total population of 284,922. Ward number 14 has the highest population
          with 21232 families. Ward number 29 has the least population (4159)
          with 782 families.
        </p>
      </div>
      <div className="flex font-bold justify-between">
        <div className="font-bold">
          <div>284,922</div>
          <div className="text-[#e35163]">Total Population</div>
        </div>
        <div>
          <div>70,256</div>
          <div className="text-[#e35163]">Total HouseHold Number</div>
        </div>
      </div>
      <div className="flex mt-3 font-bold justify-around">
        <div>
          <div className="">145,924</div>
          <div className="text-[#e35163]">Male Population</div>
        </div>
        <div>
          <div>138,998</div>
          <div className="text-[#e35163]">Female Populaiton</div>
        </div>
        <div>
          <div>0</div>
          <div className="text-[#e35163]">Other Population</div>
        </div>
      </div>
    </div>
  );
};
