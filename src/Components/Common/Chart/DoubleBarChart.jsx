import { Legend } from "chart.js";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DoubleBar = ({ data, datakey1, datakey2, name, labelBy }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-[#f0d0b1] p-2 rounded-lg">
          <div className="label">
            <div className="text-white text-sm">{`Ward : ${label}`}</div>
            <div className="text-white text-sm">{`${datakey1} : ${payload[0].value}`}</div>
            <div className="text-white text-sm">{`${datakey2} : ${payload[1].value}`}</div>
          </div>
        </div>
      );
    }

    return null;
  };
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width="100%"
        height="100%"
        data={data}
        margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
        layout="vertical"
      >
        <XAxis type="number" hide domain={[0, "dataMax"]} id="formal-bar" />
        <XAxis type="number" hide domain={[0, "dataMax "]} id="informal-bar" />
        <YAxis
          type="category"
          dataKey={labelBy}
          axisLine={true}
          domain={[5, 100]}
          style={{
            fontSize: "13px",
            color: "#212121",
          }}
          minTickGap={-20}
          dx={-20}
          label={{ value: "Ward", angle: -90, position: "left" }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey={datakey1} fill="#ffbf00" barSize={20}></Bar>
        <Bar dataKey={datakey2} fill="#347eff" barSize={20}></Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DoubleBar;
