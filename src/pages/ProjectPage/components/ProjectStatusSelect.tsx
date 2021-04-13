import { Select } from "antd";
import React, { useState } from "react";
import { useProjectStatus } from "../../../hooks/useProjectStatus";

const ProjectStatusSelect = ({
  disabled,
  onChange,
  value,
  showAll,
}: {
  value?: string;
  onChange?: Function;
  disabled?: boolean;
  showAll?: boolean;
}) => {
  const [projectStatus, loadingProjectStatus] = useProjectStatus();
  const [_value, setValue] = useState<string | undefined>(value);

  const handleChange = (v: string) => {
    setValue(v);
    onChange && onChange(v);
  };

  return (
    <Select
      value={_value}
      placeholder="Estatus del proyecto"
      style={{ width: "100%" }}
      disabled={disabled}
      onChange={handleChange}
      loading={loadingProjectStatus}
    >
      {showAll && (
        <Select.Option value={0} key={"ALL"}>
          TODOS
        </Select.Option>
      )}
      {projectStatus.map((status) => (
        <Select.Option value={status.id} key={status.id}>
          {status.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default ProjectStatusSelect;
