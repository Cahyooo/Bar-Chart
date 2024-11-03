import React, { useEffect, useRef, useState } from "react";
import { scaleLinear } from "d3";
import * as d3 from "d3";
import { fetchAPI } from "./api.jsx";

const Axis = ({ scale, orient, transform, id }) => {
  const axisRef = useRef();

  useEffect(() => {
    const axisGenerator =
      orient === "bottom"
        ? d3.axisBottom(scale)
        : d3.axisLeft(scale);
    d3.select(axisRef.current).call(axisGenerator);
  }, [scale, orient]);

  return <g id={id} ref={axisRef} transform={transform} />;
};

const BarAxis = ({ heightSVG, widthSVG, children }) => {
  const width = widthSVG;
  const height = heightSVG;
  const margin = { top: 20, right: 30, bottom: 50, left: 40 };

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAPI((data) => setData(data));
  }, []);

  const xAxisMin = d3.min(data, (d) => new Date(d[0]).getFullYear());
  const xAxisMax = d3.max(data, (d) => new Date(d[0]).getFullYear());
  const yAxisMax = d3.max([...data], (d) => d[1]);

  // Skala sumbu
  const xScale = d3
    .scaleTime()
    .domain([new Date(xAxisMin, 0, 1), new Date(xAxisMax, 11, 31)])
    .range([0, width - margin.left - margin.right]);
  const yScale = scaleLinear()
    .domain([0, yAxisMax])
    .range([height - margin.top - margin.bottom, 0]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {/* Sumbu X di bawah */}
        <Axis
          id={"x-axis"}
          scale={xScale}
          orient="bottom"
          transform={`translate(0,${height - margin.top - margin.bottom})`}
        />
        {children}
        {/* Sumbu Y di kiri */}
        <Axis
          id={"y-axis"}
          scale={yScale}
          orient="left"
          transform="translate(0,0)"
        />
      </g>
    </svg>
  );
};

export default BarAxis;
