import { Select } from "antd";
import React from "react";
import { usePrograms } from "../../../hooks/usePrograms";

const ProgramSelect = ({
  institutionId,
  value,
  onChange,
  disabled,
  initial_value
}: {
  institutionId?: string;
  value?: string;
  onChange?: Function;
  disabled?: boolean;
  initial_value?: string
}) => {
  const [programs, loadingPrograms] = usePrograms(institutionId);

  const handleChange = (v: string) => {
    onChange && onChange(v);
  };

  return (
    <Select
      defaultValue={ initial_value }
      onChange={handleChange}
      loading={loadingPrograms}
      disabled={disabled}
      showSearch
      filterOption={true}
      optionFilterProp='label' >
      {programs.map((program) => (
        <Select.Option value={program.id} key={program.id} label={program.name} >
          {program.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default ProgramSelect;
