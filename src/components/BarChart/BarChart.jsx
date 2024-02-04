import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ labels, count }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
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
      },
    ],
  };
  return <Bar data={data} options={options} />;
};

export default BarChart;
