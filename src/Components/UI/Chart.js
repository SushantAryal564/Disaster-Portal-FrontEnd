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
      .range([0, 270])
      .padding(0.3)
      .paddingOuter(0.6)
      .align(0.1)
      .round(true);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
    //   .clamp(true)
      //   .nice()
      // .tickSize(2)
      .range([height+20,21]);
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
      .attr("transform", `translate(0, ${height+1})`)
      .call(xAxis);

    const yAxis = d3.axisLeft(yScale);
    svg.
    select(".y-axis")
    .attr("text-anchor", "right")
     .attr("transform", `translate(0, ${-21})`)
    .call(yAxis);

    // Create bars and add them to the chart
    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
    //   .domain([0,100])
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.name))
      .attr("y", (d) => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d.value)+2)
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
      .attr("y", (d) => yScale(d.value) - 10)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .attr("font-weight", "bold")
      .attr("fill", "black")
      .text((d) => d.value);
  }, [data, height, width]);

  return (
    <>
      <div className="">
        {/* <span className="">{title}</span> */}
        <div className=""></div>
        <div className="">
            {/* {title} */}
          <svg ref={svgRef}>
            <g className="x-axis" />
            <g className="y-axis" />
            <text
              x={width }
              y={height-100}
              textAnchor="middle"
              fontWeight="bold"
              fontSize="10px"
              fill="#333"
            >asd</text>
          </svg>
        </div>
      </div>
    </>
  );
};

export default BarChart;
