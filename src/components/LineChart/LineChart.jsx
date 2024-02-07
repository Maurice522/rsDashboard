import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({ labels, count }) => {
  const options = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          color: "#fff",
          font: {
            size: 10,
          },
        },
      },
      x: {
        ticks: {
          color: "#fff",
          font: {
            size: 8,
          },
        },
      },
    },
    plugins: {
      tooltip: {
        bodyColor: "#fff",
      },
      legend: {
        position: "top",
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: "Activity",
        data: count,
        backgroundColor: (context) => {
          const bgColor = ["rgba(255, 255, 255, 1)", "rgba(0, 0, 0, 1)"];
          console.log(context);
          if (!context.chart.chartArea) {
            return;
          }
          console.log(context.chart.chartArea);
          const {
            ctx,
            data,
            chartArea: { top, bottom },
          } = context.chart;
          const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
          gradientBg.addColorStop(0, bgColor[0]);
          gradientBg.addColorStop(1, bgColor[1]);
          return gradientBg;
        },
        borderColor: "rgba(255, 255, 255, 1)",
        color: "rgba(255, 255, 255, 1)",
        fill: true,
        lineTension: "0.4",
      },
    ],
  };
  return <Line data={data} options={options} />;
};

export default LineChart;
