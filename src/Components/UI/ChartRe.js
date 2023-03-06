import React, { Component } from 'react';
import { render } from 'react-dom';
import { scaleBand, scaleLinear } from 'd3-scale';
import XYAxis from './axis/xy-axis.js';
import Grid from './grid/grid.js';
import Bar from './bar/bar.js';
import { transition } from 'd3-transition';

export class ChartRe extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        { name: 'Sun', value: 100 },
        { name: 'Mon', value: 50 },
        { name: 'Tue', value: 500 },
        { name: 'Wed', value: 300 },
        { name: 'Thu', value: 200 },
        { name: 'Fri', value: 20 },
      ],
    }
  }
  randomizeData = (e) => {
    e.preventDefault();
    const data = this.state.data.map(obj => ({
      name: obj.name,
      value: Math.floor(Math.random() * 500 + 1)
    }))
    this.setState({ data });
  }
  render() {
    const { data } = this.state;
    const parentWidth = 500;
    const margin = {
      top: 10,
      right: 10,
      bottom: 20,
      left: 40,
    };
    const ticks = 6;
    const t = transition().duration(1000);

    const width = parentWidth - margin.left - margin.right;
    const height = parentWidth * 0.5 - margin.top - margin.bottom;

    const xScale = scaleBand()
      .domain(data.map(d => d.name))
      .range([0, width])
      .padding(0.26);

    const yScale = scaleLinear()
      .domain([0, Math.max(...data.map(d => d.value))])
      .range([height, 0])
      .nice();

    return (
      <div>
        <button
          onClick={this.randomizeData}
        >
          Randomize data
        </button>
        <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <XYAxis {...{ xScale, yScale, height, ticks, t }} />
            <Grid {...{ xScale, yScale, width, ticks, t }} />
            <Bar
              {...{
                xScale,
                yScale,
                data,
                height,
                t,
              }}
            />
          </g>
        </svg>
      </div>
    );
  }
}

