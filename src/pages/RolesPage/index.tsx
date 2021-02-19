import { Button } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { PlusCircleOutlined } from "@ant-design/icons";
import RoleList from './RoleList';

const RolesPage = () => {

    const history = useHistory();
  
    return (
      <>
        <Button
          onClick={() => history.push('/nuevo-rol')}
          type="primary"
          icon={<PlusCircleOutlined />}>Crear</Button>
        <RoleList />
      </>)
  }
export default RolesPage;