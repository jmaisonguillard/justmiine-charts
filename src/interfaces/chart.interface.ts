import { ReactNode } from "react";

export interface ChartInterface {
  type: "line";
  width: number;
  height: number;
  data?: ChartDataInterface;
  options?: ChartOptionsInterface;
}

export interface ChartDataInterface {
  labels?: string[];
  order?: number | null;
  datasets: ChartDataSetsInterface[];
  indicators?: number[];
}

export interface ChartDataSetsInterface {
  label?: string | null;
  ids?: number[];
  data?: number[] | ChartPointInterface[];
  dimensionalData?: number[][] | ChartPointInterface[][];
  tooltipData?: ReactNode[];
  pointClassStyle?: string[];
  pointDimensionClassStyle?: string[][];
}

export interface ChartOptionsInterface {
  background?: string;
  border?: boolean;
}

export interface ChartPointInterface {
  x: number;
  y: number;
}
