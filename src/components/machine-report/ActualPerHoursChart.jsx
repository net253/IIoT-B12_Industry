import React from "react";
import { Bar } from "react-chartjs-2";
import { Card } from "react-bootstrap";

const startHour = 8;
const labelHours = Array(13)
  .fill(0)
  .map((_, index) => `${startHour + index}.00`);

const dataTarget = Array(13).fill(100);

const dataActual = Array(13)
  .fill(0)
  .map(() => Math.floor(Math.random() * 150));

const data = () => ({
  labels: labelHours,
  datasets: [
    {
      data: dataTarget,
      label: "Target",
      borderColor: "#c45850",
      backgroundColor: "#fff",
      fill: false,
      type: "line",
    },
    {
      data: dataActual,
      label: "FG",
      borderColor: "#0099ff",
      backgroundColor: "#0099ff",
      fill: false,
    },
  ],
});

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

export default function ActualPerHoursChart() {
  return (
    <Card body>
      <Bar data={data} options={options} />
    </Card>
  );
}
