import React from "react";
import { Card } from "react-bootstrap";
import { Bar } from "react-chartjs-2";

export default function BarTarget100() {
  const qty = 20;

  const randomRGBA = (opacity) => {
    const rbg = Array(3)
      .fill(0)
      .map(() => Math.floor(Math.random() * 255))
      .join(", ");
    return `rgba(${rbg}${opacity})`;
    //     return `rgba(50, 50, 200, ${opacity})`;
  };

  const values = Array(qty)
    .fill(0)
    .map(() => Math.floor(Math.random() * 140));

  const labels = Array(qty)
    .fill(0)
    .map((_, i) => `Machine#${i + 1 < 10 ? "0" + (i + 1) : i + 1}`);

  const target = Array(qty).fill(100);

  const data = {
    labels: labels,
    datasets: [
      {
        data: target,
        label: "Target 100",
        borderColor: "#dc3545",
        backgroundColor: "#fff",
        fill: false,
        type: "line",
      },
      {
        label: "% Target",
        data: values,
        backgroundColor: Array(qty)
          .fill(0)
          .map(() => randomRGBA(0.2)),

        borderColor: Array(qty)
          .fill(0)
          .map(() => randomRGBA(1)),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <>
      <Card body>
        <div style={{ height: "300px" }}>
          <Bar data={data} options={options} />
        </div>
      </Card>
    </>
  );
}
