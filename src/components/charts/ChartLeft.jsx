import React from "react";
import { Bar } from "react-chartjs-2";

const startHour = 8;
const labelHours = Array(13)
  .fill(0)
  .map((_, index) => `${startHour + index}.00`);

const dataTarget = Array(13).fill(100);

const dataActual = Array(13)
  .fill(0)
  .map(() => Math.floor(Math.random() * 150));

// let X = 0;
// const TotalActual = Actual.map((value) => {
//   X += value;
//   return X;
// });

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
    // {
    //   type: "line",
    //   label: "Total",
    //   data: TotalActual,
    //   borderColor: "#00f",
    //   backgroundColor: "#0099ff",
    //   fill: false,
    //   stepped: true,
    // },
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

export default function ChartJs() {
  return (
    <>
      <Bar data={data} options={options} />
    </>
  );
}
