import { Select } from "antd";
import React from "react";
import { useProjectStatus } from "../../../hooks/useProjectStatus";

const ProjectStatusSelect = ({
    disabled,
    onChange
}: {
    onChange?:Function,
    disabled?:boolean
}) => {
  
  const [projectStatus, loadingProjectStatus] = useProjectStatus();

  const handleChange = (v: string) => {
    onChange && onChange(v);
  };

  return (
    <Select disabled={disabled} onChange={handleChange} loading={loadingProjectStatus}>
      {projectStatus.map((status) => (
        <Select.Option value={status.id} key={status.id}>
          {status.name}
        </Select.Option>
        
      ))}
    </Select>
  );
};

export default ProjectStatusSelect;
