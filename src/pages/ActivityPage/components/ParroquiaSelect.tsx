import { Select } from "antd";
import React from "react";
import { useParroaquias } from "../../../hooks/useParroquias";

const ParroquiaSelect = ({
  initial_value,
  municipio_id,
  value,
  onChange,
  disabled
}: {
  initial_value?: string;
  municipio_id?: string;
  value?: string;
  onChange?: Function;
  disabled?: boolean;
}) => {
  const [parroquias, loadingParroquias] = useParroaquias(municipio_id);

  const handleChange = (v: string) => {
    onChange && onChange(v);
  };

  return (
    <Select defaultValue={initial_value} style={{width: '100%'}} disabled={disabled} onChange={handleChange} loading={loadingParroquias} placeholder="Parroquia">
      {parroquias.map((parroquias) => (
        <Select.Option value={parroquias.id} key={parroquias.id}>
          {parroquias.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default ParroquiaSelect;
