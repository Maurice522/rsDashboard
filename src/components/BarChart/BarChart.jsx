import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ labels, count }) => {
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
      legend: {
        position: "top",
      },
      tooltip: {
        bodyColor: "#fff",
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: "Resumes",
        data: count,
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(25, 99, 132, 1)",
          "rgba(78, 162, 235, 1)",
          "rgba(224, 206, 86, 1)",
          "rgba(36, 192, 192, 1)",
          "rgba(130, 102, 255, 1)",
          "rgba(120, 159, 64, 1)",
        ],
        borderColor: "rgba(255,255,255,1)",
        color: "rgba(255,255,255,1)",
      },
    ],
  };
  return <Bar data={data} options={options} />;
};

export default BarChart;
