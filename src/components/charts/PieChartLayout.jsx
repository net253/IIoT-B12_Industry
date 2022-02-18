import React from "react";
import { Pie } from "react-chartjs-2";

const data = {
  //   labels: ["Red", "Yellow", "Green"],
  labels: ["Stop", "Offline", "Online"],
  datasets: [
    {
      label: "# of Votes",
      data: [4, 2, 22],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(150, 150, 150, 0.2)",
        "rgba(75, 192, 192, 0.2)",
      ],

      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(150, 150, 150, 1)",
        "rgba(75, 192, 192, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const PieChartLayout = () => (
  <>
    <Pie data={data} options={options} />
  </>
);

export default PieChartLayout;
