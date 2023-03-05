import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const BarChart = ({
  data,
  width = 525,
  height = 300,
  title = "Infrastructures data in the selected Area",
}) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.style('background', 'linear-gradient(to bottom,#416BEE , #291AF4)');
    // Create scales for the x and y axis
    const xScale = d3.scaleBand()
    .domain(data.map(d => d.name))
    .range([0, width])
    .padding(0.26);

      const yScale = d3.scaleLog()
      .domain([1, d3.max(data, d => d.value)-20])
      .range([height, 20])
      // .nice();

    // Create ordinal color scale for the bars
    const colorScale = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.name))
      .range(["red", "blue", "green", "orange"]);

    // Create x and y axis and add them to the chart
    const xAxis = d3.axisBottom(xScale);
    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${height})`)
      .attr('stroke','black')
      .call(xAxis);

    const yAxis = d3.axisLeft(yScale);
    svg
      .select(".y-axis")
      .call(yAxis);

      
    // Create bars and add them to the chart
    const bars = svg.selectAll('.bar')
    .data(data)
    .join('rect')
    .attr('class', 'bar')
    .attr('x', (d) => xScale(d.name))
    .attr('y', (d) => yScale(d.value))
    .attr('width', xScale.bandwidth())
    .attr('height', (d) => height+20 - yScale(d.value))
    .attr('fill', (d) => colorScale(d.name))
    .attr('rx', 2) // set the horizontal radius of the corners
  .attr('ry', 2)
    // .style('filter', 'url(#drop-shadow)')
    .append('title')
    
    .text((d) => `${d.name}: ${d.value}`);

    // Add labels to the bars
    svg.selectAll('line')
    .data(yScale.ticks(100))
    .join('line')
    .attr('class', 'grid-line')
    .attr('x1', 700)
    .attr('x2', -20)
    //  .attr('y1', 500)
    // .attr('y2', 10)
    .style('stroke', 'gray');
    
    // .attr('y1', (d) => yScale(d))
    // .attr('y2', (d) => yScale(d));
     
    //
    
    svg.append("text")
  .attr("x", svg.attr("width") / 2)
  .attr("y", 15)
  .attr("text-anchor", "middle")
  .attr("font-size", "15px")
  .attr("fill", "white")
  .text("Infrastructure in disaster Area");
    
    
    
    svg
  .selectAll(".label")
  .data(data)
  .join("text")
  .attr("class", "label")
  .attr("x", (d) => xScale(d.name) + xScale.bandwidth() / 2)
  .attr("y", (d) => yScale(d.value+1.3) ) // fixed value
  .attr("text-anchor", "middle")
  .attr("font-size", "12px")
  .attr("font-weight", "bold")
  .attr("fill", "white")
  .attr('rx', 28) // set the horizontal radius of the corners
  .attr('ry', 18)
  .text((data) => data.value+" "+data.name);
  }, [data, height, width]);

  return (
    <div className="chart-container">
      <div className="chart-title"></div>
      <svg ref={svgRef} width={width} height={height}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
};

export default BarChart;