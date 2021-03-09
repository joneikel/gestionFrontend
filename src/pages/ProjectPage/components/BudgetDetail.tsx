import { Space, Table, Tag, Tooltip, Typography } from "antd";
import { Bar, Line } from "react-chartjs-2";
import { moneyFormatter } from "../../../helpers";
import { Budget, BudgetSource } from "../../../models";
import moment from 'moment';

const BudgetDetail = ({ budget }: { budget: Budget[] }) => {

  const cols = [
    {
      dataIndex: 'budget_source',
      title: "Fuente",
      key: "source",
      render: (source: BudgetSource) => source.name
    },
    {
      dataIndex: 'value',
      title: "Bolivares",
      key: "bs",
      render: (value: number) => moneyFormatter(value.toString())
    },
    {
      dataIndex: 'dollar_value',
      title: "Divisa",
      key: "divisa",
      render: (dollar_value: number) => <Tooltip title="Valor aproximado">≈ {moneyFormatter(dollar_value.toString(), "$ ")}</Tooltip>
    },
    {
      dataIndex: 'created_at',
      title: "Fecha",
      key: "date",
      render: (created_at: string) => moment(created_at).format("L")
    }
  ];

  return (
    <div>
        <Table
          size="small"
          columns={cols}
          dataSource={budget}
          pagination={false}
          summary={(pageData) => {
            const totalBs = pageData.map(b => Number.parseFloat(b.value.toString())).reduce((a, b) => a + b);
            const totalDollar = pageData.map(b => Number.parseFloat(b.dollar_value?.toString() || "0")).reduce((a, b) => (a || 0) + (b || 0)) || 0;
            return (
              <Table.Summary.Row>
                <Table.Summary.Cell colSpan={1} index={0}>
                  <Typography.Text strong>Total</Typography.Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} index={1}>
                  <Typography.Text strong>{moneyFormatter(totalBs.toString())}</Typography.Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} index={2}>
                  <Typography.Text strong>≈ {moneyFormatter(totalDollar?.toString(), "$ ")}</Typography.Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
              )
            }}
          />
      </div>
  )
}

export const BudgetGraph = ({ budget }: { budget: Budget[] }) => {

  const data = {
    labels: budget.map(b => b.budget_source.name),
    datasets: [
      {
        label: 'Bolivares',
        yAxisID: 'y-axis-1',
        data: budget.map(b => b.value),
        fill: true,
        backgroundColor: '#038def3a',
        borderColor: '#021c52',
      },
      {
        label: 'Dolares',
        yAxisID: 'y-axis-2',
        data: budget.map(b => b.dollar_value),
        fill: true,
        backgroundColor: '#11bd063a',
        borderColor: '#075202',
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left',
          ticks: {
            fontColor: "#038def",
            beginAtZero: true,
            callback: function (value: string, index: number, values: string[]) {
              return index % 2 === 0 ? moneyFormatter(value, "Bs") : null;
            }
          },
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          display: true,
          position: 'right',
          ticks: {
            fontColor: "#075202",
            beginAtZero: true,
            callback: function (value: string, index: number, values: string[]) {
              return index % 2 === 0 ? moneyFormatter(value, "$") : null;
            }
          },

        },
      ],
    },
  }

  return (
    <Line height={200} width={650} data={data} options={options} />
  );
}

export default BudgetDetail;