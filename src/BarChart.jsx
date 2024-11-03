import { useEffect, useState } from "react";
import { fetchAPI } from "./api";
import { max } from "d3";
import { useModal } from "./Modal";

export const BarChart = ({ heightSVG, widthSVG }) => {
  const [data, setData] = useState([]);
  const [hoveredBar, setHoveredBar] = useState(false);

  const { showModal, hideModal } = useModal();

  useEffect(() => {
    fetchAPI((data) => setData(data));
  }, []);

  const yAxisMax = max([...data], (d) => d[1]);

  const margin = { top: 20, right: 30, bottom: 50, left: 40 };
  const width = (widthSVG - margin.left - margin.right) / data.length;
  const height = heightSVG - margin.bottom - margin.top;

  return (
    <>
      {data.map((d, i) => {
        // const barHeight = ((d[1] / yAxisMax) / 100) * height;
        const barHeight = (d[1] / yAxisMax) * height;
        const xPos = i * width;
        return (
          <rect
            className="bar"
            data-date={d[0]}
            data-gdp={d[1]}
            key={i}
            x={i * width}
            y={height - barHeight}
            width={width}
            height={barHeight}
            fill={hoveredBar === i ? "#ffffff" : "#46B5FF"}
            onMouseEnter={() => {
              setHoveredBar(i);
              showModal(xPos + width, height - barHeight / 2, d);
            }}
            onMouseLeave={() => {
              setHoveredBar(null);
              hideModal()
            }}
          ></rect>
        );
      })}
    </>
  );
};
