import { Card } from "antd";
import React from "react";
import { Bar } from "react-chartjs-2";

const GroupedBar = ({
  datasets,
  labels,
  title,
}: {
  datasets: any[];
  labels: string[];
  title: string;
}) => {
  const data = {
    labels,
    datasets,
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
  return (
    <Card title={<h1 className="title">{title}</h1>}>
      <Bar type="horizontal" height={100} data={data} options={options} />
    </Card>
  );
};

export default GroupedBar;
