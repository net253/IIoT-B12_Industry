import React from "react";
import { Card } from "react-bootstrap";
import { Pie } from "react-chartjs-2";

export default function StatusPie() {
  const data = {
    labels: ["Online", "Stop", "Alarm", "Offline"],
    datasets: [
      {
        label: "# of Status",
        data: [4, 2, 9, 22],
        backgroundColor: [
          "rgba(40, 167, 69, 0.2)",
          "rgba(220, 53, 69, 0.2)",
          "rgba(255, 193, 7, 0.2)",
          "rgba(108, 117, 125, 0.2)",
        ],

        borderColor: [
          "rgba(40, 167, 69, 1)",
          "rgba(220, 53, 69, 1)",
          "rgba(255, 193, 7, 1)",
          "rgba(108, 117, 125, 1)",
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
        display: true,
      },
    },
  };

  return (
    <>
      <Card body>
        <div style={{ height: "280px" }}>
          <Pie data={data} options={options} />
        </div>
      </Card>
    </>
  );
}
