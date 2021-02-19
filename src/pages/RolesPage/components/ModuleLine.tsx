import { Divider, Tag, Typography } from 'antd';
import { AxiosInstance } from 'axios';
import React, { useState } from 'react';
import { CheckOutlined, CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import { Module, Scope } from '../../../models';

const ModuleLine = ({ module, roleScopes, roleId, axios }: ScopeLineProps) => {

  return (
    <div className="module-line">
      <div className="module-label">
      <Typography>{module.label}</Typography>
      </div>
      <Divider type="vertical" />
      {module.scopes?.map(scope =>
        <ScopeItemToggle axios={axios} roleId={roleId} isActive={roleScopes.includes(scope.id)} key={scope.id} scope={scope}
        />)}
    </div>
  )
}

const ScopeItemToggle = ({ scope, isActive, roleId, axios }: { scope: Scope, isActive: boolean, roleId: string, axios: AxiosInstance }) => {
  const [_isActive, setIsActive] = useState(isActive);
  const [isLoading, setLoading] = useState(false);

  return <Tag
    color={_isActive ? "#038DEF" : "#ccc"}
    icon={isLoading ? <LoadingOutlined /> : (_isActive ? <CheckOutlined /> : <CloseOutlined />)}
    style={{cursor:'pointer'}}
    onClick={() => {
      setLoading(true);
      toggleScope(scope.id, roleId, axios)
        .then(setIsActive)
        .finally(() => setLoading(false));
    }}>{scope.name}</Tag>
}

async function toggleScope(scope_id: string, role_id: string, axios: AxiosInstance) {
  const response = await axios.patch('role  /toggle-scope', {
    scope_id,
    role_id
  });
  return response.data.is_active;
}

export type ScopeLineProps = {
  module: Module,
  roleScopes: string[],
  roleId: string,
  axios: AxiosInstance
}

export default ModuleLine;