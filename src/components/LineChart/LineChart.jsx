import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({ xTitle, yTitle, title, labels, count }) => {
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#fff",
          font: {
            size: 10,
          },
          stepSize: 1,
        },
        grid: {
          color: "rgba(255,255,255,1)",
        },
        border: {
          width: 1,
          color: "#fff",
        },
        title: {
          display: true,
          text: yTitle,
          color: "#fff",
        },
      },
      x: {
        ticks: {
          color: "#fff",
          font: {
            size: 8,
          },
        },
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: xTitle,
          color: "#fff",
        },
      },
    },
    plugins: {
      tooltip: {
        bodyColor: "#fff",
      },
      legend: {
        display: false,
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: count,
        backgroundColor: (context) => {
          const bgColor = ["rgba(255, 255, 255, 1)", "rgba(0, 0, 0, 1)"];
          if (!context.chart.chartArea) {
            return;
          }
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
        lineTension: "0.4",
      },
    ],
  };
  return <Line data={data} options={options} />;
};

export default LineChart;
