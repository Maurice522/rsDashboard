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
        backgroundColor:[
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
      ],
        borderColor: "rgba(0,0,0,1)",
      },
    ],
  };
  return <Bar data={data} options={options} />;
};

export default BarChart;
