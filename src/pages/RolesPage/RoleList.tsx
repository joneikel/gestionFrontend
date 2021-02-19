import { Button, message, Space, Table } from 'antd';
import { AxiosInstance } from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAxios } from '../../hooks/useAxios';
import { useRole } from '../../hooks/useRole';
import { Role } from '../../models';

const RoleList = () => {

    const [roles, loadingRole] = useRole();
    const axios = useAxios();
    const [loading, setLoading] = useState(false);
    const history = useHistory();

  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },{
        title: "Acciones",
        dataIndex: "id",
        key: "actions",
        render: (id: string, record: Role) => (
            <Space>
              <Button onClick={() => history.push("/roles-scopes", record)}>
              Cambiar scopes 🛡️
              </Button>
            </Space>
          ),
    }
  ];

  return (
      <Table
        columns={columns}
        dataSource={roles}
        loading={loading}
      />
  )
};


export default RoleList;