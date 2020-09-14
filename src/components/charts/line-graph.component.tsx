import React from "react";
import { ChartDataInterface } from "../../interfaces/chart.interface";
import { drawData, drawGrid, drawRect } from "./chart.utils";

interface Props {
  width: number;
  height: number;
  data: ChartDataInterface | undefined;
  className?: string;
}

export default function LineGraphChartComponent({
  width,
  height,
  data,
}: Props) {
  const horizontalSpots = data?.labels?.length || 0;

  return (
    <>
      {drawRect(0, 0, width, height, 0, "justmiine-graph-border-rect")}
      {drawGrid(0, 0, width, height, 0, horizontalSpots)}
      {drawData(width, height, data)}
    </>
  );
}
