import { Select } from "antd";
import React from "react";
import { useProjects } from "../../../hooks/useProject";

const ProjectSelect = ({
  programId,
  value,
  onChange,
  disabled,
  initial_value
}: {
  programId?: string;
  value?: string;
  onChange?: Function;
  disabled?: boolean;
  initial_value?: string;
}) => {
  const [projects, loadingProjects] = useProjects(programId);

  const handleChange = (v: string) => {
    onChange && onChange(v);
  };

  return (
    <Select defaultValue={initial_value} disabled={disabled} onChange={handleChange} loading={loadingProjects}>
      {projects.map((projects) => (
        <Select.Option value={projects.id} key={projects.id}>
          {projects.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default ProjectSelect;
