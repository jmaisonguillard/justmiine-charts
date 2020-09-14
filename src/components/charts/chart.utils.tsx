import { useState } from "@storybook/addons";
import React from "react";
import {
  ChartDataInterface,
  ChartDataSetsInterface,
} from "../../interfaces/chart.interface";

export function drawLine(
  x: number,
  y: number,
  l: number,
  o: number,
  index: number,
  className?: string
) {
  const direction = o ? "V" : "H";

  return (
    <path
      key={`${className}-${index}`}
      className={className}
      d={`M${o === 0 ? 0 : x} ${o === 1 ? 0 : y}, ${direction}${l} 0`}
    />
  );
}

export function drawRect(
  x: number,
  y: number,
  w: number,
  h: number,
  rx = 0,
  className?: string
) {
  return (
    <rect className={className} x={x} y={y} width={w} height={h} rx={rx} />
  );
}

export function drawText(x: number, y: number, text: string) {}

export function drawIndicator(
  x: number,
  y: number,
  canvasWidth: number,
  canvasHeight: number,
  w: number,
  h: number,
  rx: number,
  text: string
) {
  const offset = canvasHeight - h - y;

  return (
    <svg
      width={w}
      height={h}
      x={x}
      y={canvasHeight - h + h / 2}
      className="justmiine-graph-indicators"
    >
      <rect x={x} y={-y} width={w} height={h} rx={rx} />
      <foreignObject x={x} y={-y + 5} width={w} height={h}>
        <div>{text}</div>
      </foreignObject>
    </svg>
  );
}

export function drawGrid(
  x: number,
  y: number,
  w: number,
  h: number,
  hl: number,
  vl: number
) {
  const lines = [];

  if (hl > 0) {
    const spacing = Math.ceil(h / hl);
    for (let i = 0; i < h; i += spacing) {
      if (i > 0) {
        lines.push(drawLine(0, i, w, 0, i, "justmiine-graph-grid-h"));
      }
    }
  }

  if (vl > 0) {
    const spacing = Math.ceil(w / vl);
    for (let i = 0; i < w; i += spacing) {
      if (i > 0) {
        lines.push(drawLine(i, 0, h, 1, i, "justmiine-graph-grid-v"));
      }
    }
  }

  return lines;
}

export function getPointCoordinates(
  data: ChartDataInterface,
  index: number,
  xIndex: number,
  w: number,
  h: number,
  hl: number,
  vl: number
): { px: number; py: number } {
  const datasets = data.datasets || [];
  let py: number = 0;
  let px: number = 0;

  if (typeof datasets[index].data[xIndex] === "number") {
    py = h - datasets[index].data[xIndex];
    px = xIndex * hl + 15;
  } else if (typeof datasets[index].data[xIndex] !== "undefined") {
    py = h - datasets[index].data[xIndex].y;
    px = datasets[index].data[xIndex].x;
  }

  return { px, py };
}

export function getGroupPointCoordinates(
  datasets: any[][],
  groupIndex: number,
  index: number,
  xIndex: number,
  w: number,
  h: number,
  hl: number,
  v1: number
): { px: number; py: number } {
  const maxWidth = hl - 15 * 2;
  const spacing = Math.floor(maxWidth / datasets[index].length + 5 / 2);
  const position = hl * groupIndex + (xIndex + 1) * (xIndex > 0 ? spacing : 15);
  return { px: position, py: h - datasets[index][xIndex] };
}

function pointMouseOver(classNameIdent: string) {
  const elements = document.querySelectorAll(classNameIdent);
  elements.forEach((element) => element.classList.add("hover"));
}

function pointMouseLeave(classNameIdent: string) {
  const elements = document.querySelectorAll(classNameIdent);
  elements.forEach((element) => element.classList.remove("hover"));
}

function pointMouseClick(classNameIdent: string) {
  const allPointElements = document.querySelectorAll("[class*=point].active");
  allPointElements.forEach((element) => element.classList.remove("active"));
  const elements = document.querySelectorAll(`${classNameIdent}:not(.active)`);
  elements.forEach((element) => element.classList.add("active"));
}

export function drawPoint(x: number, y: number, r: number, className = "") {
  const pointClassName = `.${
    className.split(" ")[className.split(" ").length - 1]
  }`;

  return (
    <g
      onMouseOver={pointMouseOver.bind(null, pointClassName)}
      onMouseLeave={pointMouseLeave.bind(null, pointClassName)}
      onClick={pointMouseClick.bind(null, pointClassName)}
    >
      <circle className="justmiine-chart-point" cx={x} cy={y} r={r} />
      <circle
        className={`justmiine-chart-point ${className}`}
        cx={x}
        cy={y}
        r={r}
      />
    </g>
  );
}

function checkIfNextArrayEmpty(x: number, dimensionalData: any[][]) {
  return dimensionalData.length > 0;
}

export function drawData(
  w: number,
  h: number,
  data: ChartDataInterface | undefined
) {
  const htmlData = [];

  // Get Horizontal and Vertical Spacing
  const horizontalSpots = data?.labels?.length || 0;
  const horizontalSpacing = Math.ceil(w / horizontalSpots);

  // Generate Bottom Labels
  const labels = data?.labels || [];
  const datasets = data?.datasets || [];

  for (let i = 0; i < labels.length; i++) {
    htmlData.push(
      <foreignObject
        className="justmiine-graph-labels"
        x={i * horizontalSpacing}
        y={h + 10}
        width={horizontalSpacing}
        height="50"
        style={{ textAlign: "center", whiteSpace: "pre-wrap" }}
      >
        <div>{labels[i]}</div>
      </foreignObject>
    );
  }

  if (data?.indicators) {
    for (let i = 0; i < data.indicators.length; i++) {
      htmlData.push(
        drawIndicator(
          -30,
          data.indicators[i],
          w,
          h,
          39,
          17,
          8.5,
          `${data.indicators[i]}`
        )
      );
      htmlData.push(
        <path
          d={`M-20 ${h - data.indicators[i]}, H${w} 0`}
          className="justmiine-chart-indicator-line"
        />
      );
    }
  }

  for (let i = 0; i < datasets.length; i++) {
    const dimensionalData = datasets[i].dimensionalData || [];
    const dimensionalPointClassName =
      datasets[i].pointDimensionClassStyle || [];
    const flatData = datasets[i].data || [];
    if (dimensionalData.length > 0) {
      let lastKnownPointNode: { px: number | null; py: number | null } = {
        px: null,
        py: null,
      };
      for (let x = 0; x < dimensionalData.length; x++) {
        // Connect Dimension Data if possible
        const currentNode = getGroupPointCoordinates(
          dimensionalData,
          x,
          x,
          dimensionalData[x].length - 1,
          w,
          h,
          horizontalSpacing,
          0
        );
        if (currentNode && x < dimensionalData.length - 1) {
          const nextNode = getGroupPointCoordinates(
            dimensionalData,
            x + 1,
            x + 1,
            0,
            w,
            h,
            horizontalSpacing,
            0
          );

          if (currentNode.px && currentNode.py) {
            lastKnownPointNode = currentNode;
          }

          if (nextNode.px && nextNode.py) {
            htmlData.push(
              <path
                d={`M${lastKnownPointNode.px} ${lastKnownPointNode.py}, ${nextNode.px} ${nextNode.py}`}
                stroke="#8DABC4"
                strokeWidth={1}
              />
            );
          }

          if (currentNode.px && currentNode.py && nextNode.px && nextNode.py) {
            htmlData.push(
              <path
                d={`M${currentNode.px} ${currentNode.py}, ${nextNode.px} ${nextNode.py}`}
                stroke="#8DABC4"
                strokeWidth={1}
              />
            );
          }
        }
        for (let y = 0; y < dimensionalData[x].length; y++) {
          if (dimensionalData[x][y]) {
            const groupId = x;
            const { px, py } = getGroupPointCoordinates(
              dimensionalData,
              groupId,
              x,
              y,
              w,
              h,
              horizontalSpacing,
              0
            );
            if (y < dimensionalData[x].length - 1) {
              const nextNode = getGroupPointCoordinates(
                dimensionalData,
                groupId,
                x,
                y + 1,
                w,
                h,
                horizontalSpacing,
                0
              );

              htmlData.push(
                <path
                  key={`point-path-group-${groupId}-${i}-${x}-${y}`}
                  d={`M${px} ${py}, ${nextNode.px} ${nextNode.py}`}
                  stroke="#8DABC4"
                  strokeWidth={1}
                />
              );
            }
          }
        }
      }
      for (let x = 0; x < dimensionalData.length; x++) {
        for (let y = 0; y < dimensionalData[x].length; y++) {
          if (dimensionalData[x][y]) {
            const groupId = x;
            const { px, py } = getGroupPointCoordinates(
              dimensionalData,
              groupId,
              x,
              y,
              w,
              h,
              horizontalSpacing,
              0
            );
            htmlData.push(
              drawPoint(
                px,
                py,
                5,
                `${dimensionalPointClassName[x][y]} point-${x}-${y}`
              )
            );
          }
        }
      }
    } else {
      for (let x = 0; x < flatData.length; x++) {
        if (data) {
          const { px, py } = getPointCoordinates(
            data,
            i,
            x,
            w,
            h,
            horizontalSpacing,
            0
          );
          htmlData.push(drawPoint(px, py, 5));

          if (x < flatData.length - 1) {
            const nextNode = getPointCoordinates(
              data,
              i,
              x + 1,
              w,
              h,
              horizontalSpacing,
              0
            );
            htmlData.push(
              <path
                key={`point-path-${i}-${x}`}
                d={`M${px + 5} ${py}, ${nextNode.px} ${nextNode.py}`}
                stroke="#8DABC4"
                strokeWidth={1}
              />
            );
          }
        }
      }
    }
  }

  return htmlData;
}
