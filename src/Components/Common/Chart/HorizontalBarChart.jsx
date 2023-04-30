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
} from "recharts";

const HorizontalBarChart = () => {
  const data = [
    {
      name: "Building(s)",
      value: 122,
    },
    {
      name: "Waterbody",
      value: 0,
    },
    {
      name: "Forest",
      value: 0,
    },
    {
      name: "Amenities",
      value: 2,
    },
  ];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width="100%" height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" stackId="a" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HorizontalBarChart;
