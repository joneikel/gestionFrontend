import { Button, Space, Tag } from "antd";
import { AxiosInstance } from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ProjectFilters } from "..";
import MainTable from "../../../components/tables/MainTable";
import { downloadFileFromLink, moneyFormatter } from "../../../helpers";
import { baseURL, useAxios } from "../../../hooks/useAxios";
import { Budget, Project, ProjectStatus } from "../../../models";
import UserContainer from "../../../unstated/UserContainer";
import UpdateProjectStatusModal from "./UpdateProjectStatusModal";

const ProjectList = ({
  projectFilters
}: {
  projectFilters?: ProjectFilters
}) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [projects, setProjects] = useState<Project[]>([]);
  const axios = useAxios();
  const { user } = UserContainer.useContainer();
  const updateAuthorization = user?.scopes.includes("projects:update") ? true : false;

  useEffect(() => {
    setLoading(true);
    getProjects(axios, projectFilters)
      .then((c: Project[]) => setProjects(c))
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, [projectFilters]);

  const updateProject = (newProject: any) => {
    console.log(newProject);
    const updateProject = projects.map(project => project.id === newProject.id ? newProject : project);
    setProjects(updateProject);
  }

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
      dataIndex: "investment_sub_areas",
      key: "investmentsub__areas",
      render: (area: Array<any>) => area.map((x) => <Tag>{x.name}</Tag>),
    },
    {
      title: "Presupuesto",
      dataIndex: "budgets",
      key: "budgets",
      render: (budget: Array<Budget>) => {
        const bud = budget
          .map((b) => {
            let fixed_value = Number(b.value);
            return fixed_value;
          })
          .reduce((a, b) => {
            return a + b;
          });
        return moneyFormatter(bud.toString());
      },
    },
    {
      title: "Status",
      dataIndex: "project_status",
      key: "project_status",
      render: (project_status: ProjectStatus, record: Project) => (
        <UpdateProjectStatusModal
          authorization={updateAuthorization}
          project_status={project_status}
          project_id={record.id}
          onChange={updateProject}
        />
      ),
    },
    {
      title: "¿Planificado?",
      dataIndex: "is_planified",
      key: "is_planified",
      render: (x: any) => (x === 1 ? <span>Si</span> : <span>No</span>),
    },
    {
      title: "Actividades",
      dataIndex: "total_activities",
      key: "total_activities",
      render: (x: number) => <span>{x}</span>,
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
                `${baseURL}/project/ppareport/${id}`,
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
    <MainTable
      loading={loading}
      columns={columns}
      dataSource={projects}
      onSearch={(v: any) => console.log(v)}
    />
  );
};

async function getProjects(axios: AxiosInstance, params: any): Promise<Project[]> {
  const response = await axios.get("/project", {
    params
  });
  return response.data;
}

export default ProjectList;
