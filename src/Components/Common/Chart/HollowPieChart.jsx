import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const HollowPieChart = ({ data }) => {
  const COLORS = [
    "#2777ec",
    "#498828",
    "#ea2a2b",
    "#ffff2c",
    "#c6fdaf",
    "#69e52e",
  ];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width="100%" height="100%">
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend margin={{ top: 10, right: 10, bottom: 10, left: 10 }} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default HollowPieChart;
