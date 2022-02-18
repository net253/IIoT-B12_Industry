import React from "react";
import { Bar } from "react-chartjs-2";
import { Card } from "react-bootstrap";

const startHour = 8;
const labelHours = Array(13)
  .fill(0)
  .map((_, index) => `${startHour + index}.00`);

const dataTarget = Array(13).fill(2000);
const dataActual = Array(13)
  .fill(0)
  .map(() => Math.floor(Math.random() * 150));

let X = 0;
const totalData = dataActual.map((value) => {
  X += value;
  return X;
});

const data = () => ({
  labels: labelHours,
  datasets: [
    {
      data: dataTarget,
      label: "Target",
      borderColor: "#f00",
      backgroundColor: "#fff",
      fill: false,
      type: "line",
    },
    {
      type: "line",
      label: "Total",
      data: totalData,
      borderColor: "#0099ff",
      backgroundColor: "#fff",
      fill: false,
      stepped: true,
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

export default function ActualCumulativePerHours() {
  return (
    <Card body>
      <Bar data={data} options={options} />
    </Card>
  );
}
