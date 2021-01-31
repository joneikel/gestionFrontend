import { Select } from "antd";
import React from "react";
import { usePrograms } from "../../../hooks/usePrograms";

const ProgramSelect = ({
  institutionId,
  value,
  onChange,
}: {
  institutionId: string;
  value?: string;
  onChange?: Function;
}) => {
  const [programs, loadingPrograms] = usePrograms(institutionId);

  const handleChange = (v: string) => {
    onChange && onChange(v);
  };

  return (
    <Select onChange={handleChange} loading={loadingPrograms}>
      {programs.map((program) => (
        <Select.Option value={program.id} key={program.id}>
          {program.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default ProgramSelect;
