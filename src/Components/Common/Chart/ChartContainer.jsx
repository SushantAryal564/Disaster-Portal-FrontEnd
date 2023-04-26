/* eslint-disable react/prop-types */
import React, { useRef } from "react";

export default function CustomChartContainer({ header, chart, className }) {
  const componentRef = useRef(null);
  return (
    <div
      ref={componentRef}
      className={`chart-car naxatw-grid naxatw-grid-cols-12 naxatw-border-[1px] naxatw-rounded-[8px] naxatw-px-[28px] naxatw-w-full naxatw-h-full naxatw-py-4 ${className}`}
    >
      {header && (
        <div className="head naxatw-col-span-12 ">
          <div className="cover">{header(componentRef)}</div>
        </div>
      )}

      {yLabel && (
        <div className="y-label naxatw-col-span-1 naxatw-flex naxatw-justify-end naxatw-items-center">
          <p className="-naxatw-rotate-90 naxatw-mr-2 naxatw-origin-center">
            {yLabel}
          </p>
        </div>
      )}

      <div
        className={`card ${
          yLabel ? "naxatw-col-span-11" : "naxatw-col-span-12"
        } `}
      >
        {chart()}
      </div>
    </div>
  );
}
