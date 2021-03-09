import { Space, Table, Tooltip, Typography } from "antd";
import { Bar } from "react-chartjs-2";
import { moneyFormatter } from "../../../helpers";
import { Budget, BudgetSource } from "../../../models";

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
        <div style={{display: 'flex', justifyContent:'center', width: '75%'}} className="aurelio">
        <BudgetGraph budget={budget} />
        </div>
      </div>
  )
}

export const BudgetGraph = ({ budget }: { budget: Budget[] }) => {

  const data = {
    labels: budget.map(b => b.budget_source.name),
    datasets: [
      {
        label: 'Bolivares',
        data: budget.map(b => b.value),
        fill: true,
        backgroundColor: '#038def8a',
        borderColor: '#021c52',
      },
      {
        label: 'Dolares',
        data: budget.map(b => b.dollar_value),
        fill: true,
        backgroundColor: '#11bd068a',
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
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }

  return (
    <Bar height={200} width={650} data={data} options={options} />
  );
}

export default BudgetDetail;