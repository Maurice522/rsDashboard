import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({ labels, count }) => {
  const myPlugin = {
    id: "customShadow",
    beforeDraw: (chart) => {
      const ctx = chart.ctx;
      ctx.save();

      const originalLineDraw = ctx.stroke;
      ctx.stroke = function () {
        ctx.save();
        ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 4;
        originalLineDraw.apply(this, arguments);
        ctx.restore();
      };
    },
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      myPlugin,
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: "Various Job Profiles",
        data: count,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        fill: true,
      },
    ],
  };
  return <Line data={data} options={options} />;
};

export default LineChart;
