import { Card } from "antd";
import React from "react";
import { Bar } from "react-chartjs-2";

const data = {
  labels: [
    "Julián Mellado",
    "Leonardo Infante",
    "Camaguán",
    "Pedro Zaraza",
    "Las Mercedes",
    "El Socorro",
    "Francisco de Miranda",
    "Chaguaramas",
    "Santa María de Ipire",
    "Ortiz",
    "José Tadeo Monagas",
    "San José de Guaribe",
    "José Félix Ribas",
    "Juan Germán Roscio",
    "San Jerónimo de Guayabal",
  ],
  datasets: [
    {
      label: "Cantidad de actividades",
      data: [50, 85, 30, 25, 25, 3, 50, 70, 4, 45, 24, 10, 13, 44, 15],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132,1)",
        "rgba(255, 99, 132,1)",
        "rgba(255, 99, 132,1)",
        "rgba(255, 99, 132,1)",
        "rgba(54, 162, 235,1)",
        "rgba(255, 206, 86,1)",
        "rgba(75, 192, 192,1)",
        "rgba(153, 102, 255,1)",
        "rgba(255, 159, 64,1)",
        "rgba(255, 120, 132,1)",
        "rgba(54, 162, 235,1)",
        "rgba(255, 206, 86,1)",
        "rgba(75, 192, 192,1)",
        "rgba(153, 102, 255,1)",
        "rgba(255, 159, 64,1)",
      ],
      borderWidth: 1,
    },
  ],
};

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

const VerticalBar = () => (
  <Card title="Actividades totales por municipio">
    <Bar data={data} options={options} />
  </Card>
);

export default VerticalBar;
