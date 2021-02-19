import { Select } from "antd";
import React from "react";
import { useModules } from "../../../hooks/useModules";

const ModuleSelect = ({
  value,
  onChange,
}: {
  value?: string;
  onChange?: Function;
}) => {
  const [modules, loadingModules] = useModules();

  const handleChange = (v: string) => {
    onChange && onChange(v);
  };

  return (
    <Select onChange={handleChange} loading={loadingModules} placeholder="Module" >
      {modules.map((module) => (
        <Select.Option value={module.id} key={module.id}>
          {module.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default ModuleSelect;
