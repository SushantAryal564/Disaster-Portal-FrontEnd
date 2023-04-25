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

const CustomBarChart = ({ data, width, height, dataKey, legend = true }) => {
  return (
    <ResponsiveContainer width="100%" height="100%" aspect={1}>
      <BarChart
        width={500}
        height="100%"
        data={data}
        margin={{}}
        layout="vertical"
      >
        <YAxis
          type="category"
          dataKey="ward"
          domain={[0, "dataMax"]}
          axisLine={false}
          minTickGap={20}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="number_of_disasters" fill="#e35163" barSize={50}></Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
