import { Select } from "antd";
import React from "react";
import { useRole } from "../../../hooks/useRole";

const RoleSelect = ({
  value,
  onChange,
}: {
  value?: string;
  onChange?: Function;
}) => {
  const [roles, loadingRoles] = useRole();

  const handleChange = (v: string) => {
    onChange && onChange(v);
  };

  return (
    <Select onChange={handleChange} loading={loadingRoles} placeholder="Role" >
      {roles.map((role) => (
        <Select.Option value={role.id} key={role.id}>
          {role.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default RoleSelect;
