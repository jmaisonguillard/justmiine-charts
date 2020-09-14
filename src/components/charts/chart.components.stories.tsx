import React from "react";
import ChartComponent from "./chart.component";
import { Story, Meta } from "@storybook/react/types-6-0";
import { ChartInterface } from "../../interfaces/chart.interface";

export default {
  title: "Chart Library/Charts",
  components: ChartComponent,
  argTypes: {
    width: {
      control: {
        type: "range",
        min: 300,
        max: 1200,
        step: 50,
      },
    },
    height: {
      control: {
        type: "range",
        min: 150,
        max: 900,
        step: 50,
      },
    },
    type: {
      control: {
        type: "inline-radio",
        options: ["line"],
      },
    },
  },
} as Meta;

const Template: Story<ChartInterface> = (args) => <ChartComponent {...args} />;

export const LineChart = Template.bind({});
LineChart.args = {
  width: 750,
  height: 500,
  type: "line",
  data: {
    labels: ["MON\n9/12", "TUE\n9/13", "WED\n9/14", "THU\n9/15", "FRI\n9/16"],
    indicators: [130, 90],
    datasets: [
      {
        dimensionalData: [
          [130, 150, 125, 110, 130, 140, 150],
          [],
          [150],
          [],
          [120],
        ],
        pointDimensionClassStyle: [
          ["green", "green", "green", "green", "green", "green", "green"],
          [],
          ["red"],
          [],
          ["green"],
        ],
        tooltipData: [
          <div>
            Sat, Mar 28 at 8:00 AM <br />
            <h2>220/100</h2>
          </div>,
          <div>
            Sat, Mar 28 at 8:00 AM <br />
            <h2>220/100</h2>
          </div>,
          <div>
            Sat, Mar 28 at 8:00 AM <br />
            <h2>220/100</h2>
          </div>,
          <div>
            Sat, Mar 28 at 8:00 AM <br />
            <h2>220/100</h2>
          </div>,
          <div>
            Sat, Mar 28 at 8:00 AM <br />
            <h2>220/100</h2>
          </div>,
        ],
      },
      {
        dimensionalData: [[90, 80, 60, 70, 200, 80, 70], [], [80], [], [60]],
        pointDimensionClassStyle: [
          ["green", "green", "green", "green", "green", "green", "green"],
          [],
          ["red"],
          [],
          ["green"],
        ],
        tooltipData: [
          <div>
            Sat, Mar 28 at 8:00 AM <br />
            <h2>220/100</h2>
          </div>,
          <div>
            Sat, Mar 28 at 8:00 AM <br />
            <h2>220/100</h2>
          </div>,
          <div>
            Sat, Mar 28 at 8:00 AM <br />
            <h2>220/100</h2>
          </div>,
          <div>
            Sat, Mar 28 at 8:00 AM <br />
            <h2>220/100</h2>
          </div>,
          <div>
            Sat, Mar 28 at 8:00 AM <br />
            <h2>220/100</h2>
          </div>,
        ],
      },
    ],
  },
  options: {
    background: "#26374C",
    border: true,
  },
};
