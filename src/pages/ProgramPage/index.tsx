import { Card } from "antd";
import { AxiosInstance } from "axios";
import React, { useEffect, useState } from "react";
import MainTable from "../../components/tables/MainTable";
import { useAxios } from "../../hooks/useAxios";
import { Institution, Program } from "../../models";

const ProgramPage = () => {
  const axios = useAxios();

  const [loading, setLoading] = useState(false);
  const [programs, setPrograms] = useState<Program[] | undefined>();

  useEffect(() => {
    setLoading(true);
    getPrograms(axios)
      .then((c: Program[]) => setPrograms(c))
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
      title: "Institución",
      dataIndex: "institution",
      key: "institution",
      render: (x: Institution) => <a href="#">{x.name}</a>,
    },
  ];

  return (
    <Card>
      <MainTable
        loading={loading}
        columns={columns}
        dataSource={programs}
        onSearch={(v: any) => console.log(v)}
      />
    </Card>
  );
};

async function getPrograms(axios: AxiosInstance): Promise<Program[]> {
  const response = await axios.get("/program");
  return response.data;
}

export default ProgramPage;
