import { AxiosInstance } from "axios";
import React, { useEffect, useState } from "react";
import MainTable from "../../components/tables/MainTable";
import { useAxios } from "../../hooks/useAxios";
import { Program } from "../../models";

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
      render: (x: any) => <a>{x.name}</a>,
    }, 
  ];

  return (
    <MainTable
      loading={loading}
      columns={columns}
      dataSource={programs}
      onSearch={(v: any) => console.log(v)}
    />
  );
};

async function getPrograms(axios: AxiosInstance): Promise<Program[]> {
  const response = await axios.get("/program");
  return response.data;
}

export default ProgramPage;
