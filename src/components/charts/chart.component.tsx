import React from "react";
import { ChartInterface } from "../../interfaces/chart.interface";
import LineGraphChartComponent from "./line-graph.component";
import "./chart.component.css";

interface Props extends ChartInterface {
  className?: string;
}

export default function ChartComponent({
  type,
  width = 300,
  height = 150,
  className,
  data,
  options,
}: Props) {
  let parentWidth = width,
    parentHeight = height,
    paddingLeft = 30;

  if (data?.labels?.length) {
    parentHeight += 40;
  }

  if (data?.indicators?.length) {
    paddingLeft = 89;
  }

  return (
    <svg
      viewBox={`0 0 ${parentWidth} ${parentHeight}`}
      width={parentWidth}
      height={parentHeight}
      style={{
        backgroundColor: options?.background || "white",
        paddingLeft,
      }}
      className={`justmiine-graph-core ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {type === "line" && (
        <LineGraphChartComponent width={width} height={height} data={data} />
      )}
    </svg>
  );
}
