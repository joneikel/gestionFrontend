import { Card, Col, message, Row, Spin } from 'antd';
import { AxiosInstance } from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CustomPageHeader from '../../../components/PageHeader';
import { useAxios } from '../../../hooks/useAxios';
import { Module, Scope } from '../../../models';
import ModuleLine from '../components/ModuleLine';

const EditScopes = () => {
  const history = useHistory();
  const axios = useAxios();
  const role: any = history.location.state;
  const [scopes, setScopes] = useState<string[] | undefined>(undefined);
  const [modules, setModules] = useState<Module[] | undefined>(undefined);

  useEffect(() => {
    getRoleScopes(role.id, axios)
      .then(setScopes)
      .catch(e => message.error(e.toString()));
    getModulesAndScopes(axios)
      .then(setModules)
      .catch(e => message.error(e.toString()));
  }, [ role])

  return (
      <Card title={<CustomPageHeader title="Modificar scopes" />}>
        <Row gutter={12} justify="center" className="module-lines">
          <Col span={15} >
            {scopes !== undefined && modules !== undefined ?
              modules.map(module => <ModuleLine roleId={role.id} axios={axios} roleScopes={scopes} module={module} key={module.id} />)
              : <Spin />}
          </Col>
        </Row>
      </Card>
  )
}

async function getRoleScopes(role_id: string, axios: AxiosInstance) {
  const role = await axios.get(`/role/${role_id}`)
  const plainScopes = role.data.scopes.map((scope: Scope) => scope.id);
  return plainScopes;
}

async function getModulesAndScopes(axios: AxiosInstance) {
  const modules = await axios.get('/module', {
    params: { withScopes: true }
  });
  return modules.data;
}

export default EditScopes;