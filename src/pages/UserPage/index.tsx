import { Button } from "antd";
import { Link } from "react-router-dom";
import MainTable from "../../components/tables/MainTable";
import { useUsers } from "../../hooks/useUsers";
import { User } from "../../unstated/UserContainer";
import { EditOutlined } from "@ant-design/icons";

const UserPage = () => {

  const [users, loading] = useUsers();

  const columns = [
    {
      title: "usuario",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Editar",
      dataIndex: "id",
      key: "edit",
      render: (id: string, record: User) => {
        return (
          <Link to={{pathname: "/editar-usuario", state: record}}>
            <Button icon={<EditOutlined />} />
          </Link>
        );
      },
    },
  ];

  return (
    <MainTable
      loading={loading}
      columns={columns}
      dataSource={users}
      onSearch={(v: any) => console.log(v)}
    />
  );
};

export default UserPage;
