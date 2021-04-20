import { Button, Card, Col, Row, Space } from "antd";
import { AxiosInstance } from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import MainTable from "../../components/tables/MainTable";
import { useAxios } from "../../hooks/useAxios";
import { useScope } from "../../hooks/useScope";
import { Institution, Program } from "../../models";
import UserContainer from "../../unstated/UserContainer";
import InstitutionsSelect from "../ActivityPage/components/InstitutionSelect";

const ProgramPage = () => {

  const axios = useAxios();
  const history = useHistory();
  const update_program_auth = useScope("programs:update");

  const { user } = UserContainer.useContainer();
  const isAdmin = user?.role.name === "super_admin" ;
  const default_filter = {
    institution_id: user?.institution?.id ? user.institution.id : null
  }

  const [filters, setFilters] = useState(default_filter);
  const [loading, setLoading] = useState(false);
  const [programs, setPrograms] = useState<Program[] | undefined>();

  useEffect(() => {
    setLoading(true);
    getPrograms(axios, filters)
      .then((c: Program[]) => setPrograms(c))
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, [filters]);

  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Institución",
      dataIndex: "institution",
      key: "institution",
      render: (x: Institution) => <a href="#">{x.name}</a>,
    },{
      title: "Acciones",
      dataIndex: "id",
      key: "acciones",
      align: "center",
      render: (id: string, record: Program) => (
        <Space>
          { update_program_auth && <Button onClick={() => history.push("/editar-programa", record)}>
            Editar
          </Button> }
        </Space>
      ),
    }
  ];

  return (
    <Card className="floating-element">
      <div style={{ padding: '10px 10px 10px 0px' }}>
        <Row gutter={15} >
          <Col span={10} >
            <InstitutionsSelect
              onlyParent={ isAdmin ? true : undefined}
              parentId={ isAdmin ? undefined : user?.institution.id  }
              onChange={(selected_id: string) => setFilters({
                institution_id: selected_id
              })}
            />
          </Col>
          <Col span={4}>
            <Button
              type="primary"
              onClick={() => setFilters(default_filter)}
            >
              Limpiar filtros
        </Button>
          </Col>
        </Row>

      </div>
      <MainTable
        loading={loading}
        columns={columns}
        dataSource={programs}
        onSearch={(v: any) => console.log(v)}
      />
    </Card>
  );
};

async function getPrograms(axios: AxiosInstance, params: any): Promise<Program[]> {
  const response = await axios.get("/program", { params });
  return response.data;
}

export default ProgramPage;

export type ProgramFilters = {
  institution_id?: string,
}