import { Select } from "antd";
import React from "react";

const ActivityImpactSelect = ({
  value,
  onChange,
}: {
  value?: string;
  onChange?: Function;
}) => {
  const options = [
    {
      value: 1,
      label: "BAJO",
    },
    {
      value: 2,
      label: "MEDIO",
    },
    {
      value: 3,
      label: "ALTO",
    },
  ];

  const handleChange = (v: string) => {
    onChange && onChange(v);
  };

  return (
    <Select>
      {options.map(({ value, label }) => (
        <Select.Option onChange={handleChange} key={value} value={value}>
          {label}
        </Select.Option>
      ))}
    </Select>
  );
};

export default ActivityImpactSelect;
