import { Button, Card, Space, Tag } from "antd";
import { AxiosInstance } from "axios";
import React, { useEffect, useState } from "react";
import MainTable from "../../components/tables/MainTable";
import { useAxios } from "../../hooks/useAxios";
import { Project, ProjectStatus } from "../../models";
import { useHistory } from "react-router-dom";
import { downloadFile, downloadFileFromLink, moneyFormatter } from "../../helpers";

const ProjectPage = () => {
  const axios = useAxios();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<Project[] | undefined>();

  useEffect(() => {
    setLoading(true);
    getProjects(axios)
      .then((c: Project[]) => setProjects(c))
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Programa",
      dataIndex: "program",
      key: "program",
      render: (x: any) => <a>{x.name}</a>,
    },
    {
      title: "Areas de Inversión",
      dataIndex: "investmentAreas",
      key: "investmentAreas",
      render: (area: Array<any>) => area.map((x) => <Tag>{x.name}</Tag>),
    },
    {
      title: "Presupuesto",
      dataIndex: "budgets",
      key: "budgets",
      render: (budget: Array<any>) => {
        const bud = budget
          .map((b) => b.value)
          .reduce((a, b) => {
            return a + b;
          });
        return moneyFormatter(bud);
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (x: ProjectStatus) =>
        x.isFinal === true ? (
          <Tag color="red">{x.name}</Tag>
        ) : (
          <Tag color="green">{x.name}</Tag>
        ),
    },
    {
      title: "¿Planificado?",
      dataIndex: "isPlanified",
      key: "isPlanified",
      render: (x: any) => (x === 1 ? <span>Si</span> : <span>No</span>),
    },
    {
      title: "Acciones",
      dataIndex: "id",
      key: "acciones",
      align: "center",
      render: (id: string, record: Project) => (
        <Space>
          <Button onClick={() => history.push("/detalles-de-proyecto", record)}>
            Detalles
          </Button>
          <Button
            onClick={() =>
              downloadFileFromLink(
                `http://service-reports-activities.guarico.gob.ve/report/${id}/project/pdf`,
                record.name,
                "pdf"
              )
            }
          >
            Reporte
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <MainTable
        loading={loading}
        columns={columns}
        dataSource={projects}
        onSearch={(v: any) => console.log(v)}
      />
    </Card>
  );
};

async function getProjects(axios: AxiosInstance): Promise<Project[]> {
  const response = await axios.get("/project");
  return response.data;
}

export default ProjectPage;
