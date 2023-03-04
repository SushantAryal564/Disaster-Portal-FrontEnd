import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const BarChart = ({
  data,
  width = 300,
  height = 100,
  title = "Infrastructures data in the selected Area",
}) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Create scales for the x and y axis
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, 200])
      .padding(0.3)
      .paddingOuter(0.2)
      .align(0.1)
      .round(true);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .clamp(true)
      //   .nice()
      // .tickSize(2)
      .range([height, 23]);
    //   .tickFormat(d3.format("$,.2f"));

    // Create ordinal color scale for the bars
    const colorScale = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.name))
      .range(["#4CAF50", "#2196F3", "#FFC107", "#E91E63", "#9C27B0"]);

    // Create x and y axis and add them to the chart
    const xAxis = d3.axisBottom(xScale);
    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    const yAxis = d3.axisLeft(yScale);
    svg.select(".y-axis").call(yAxis);

    // Create bars and add them to the chart
    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.name))
      .attr("y", (d) => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d.value))
      .attr("fill", (d) => colorScale(d.name))
      .append("title")
      .text((d) => `${d.name}: ${d.value}`);

    // Add labels to the bars
    svg
      .selectAll(".label")
      .data(data)
      .join("text")
      .attr("class", "label")
      .attr("x", (d) => xScale(d.name) + xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d.value) - 15)
      .attr("text-anchor", "middle")
      .attr("font-size", "8px")
      .attr("font-weight", "bold")
      .attr("fill", "red")
      .text((d) => d.value);
  }, [data, height, width]);

  return (
    <>
      <div className="border-3 border-indigo-600 ml-3">
        <span className="text-md mb-6 text-bold">{title}</span>
        <div className="my-4"></div>
        <div className="py-2  text-black">
          <svg ref={svgRef}>
            <g className="x-axis" />
            <g className="y-axis" />
            <text
              x={width / 2}
              y={20}
              textAnchor="middle"
              fontWeight="bold"
              fontSize="20px"
              fill="#333"
            ></text>
          </svg>
        </div>
      </div>
    </>
  );
};

export default BarChart;
