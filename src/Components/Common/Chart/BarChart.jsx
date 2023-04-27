import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const CustomBarChart = ({ data, dataKey, name }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-[#ed818e] p-2 rounded-lg">
          <div className="label">
            <div className="text-white text-sm">{`Ward : ${label}`}</div>
            <div className="text-white text-sm">{`${name} : ${payload[0].value}`}</div>
          </div>
        </div>
      );
    }

    return null;
  };
  return (
    <ResponsiveContainer width="100%" height="90%">
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
          dataKey="ward"
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
        <Bar dataKey={dataKey} fill="#e35163" barSize={20}></Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
