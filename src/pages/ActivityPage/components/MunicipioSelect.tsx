import { Select } from "antd";
import React from "react";
import { useMunicipios } from "../../../hooks/useMunicipios";

const MunicipiosSelect = ({
  value,
  onChange,
  initial_value
}: {
  value?: string;
  onChange?: Function;
  initial_value?: string
}) => {
  const [municipios, loadingMunicipios] = useMunicipios();

  const handleChange = (v: string) => {
    onChange && onChange(v);
  };

  return (
    <Select defaultValue={initial_value} style={{width: '100%'}} onChange={handleChange} loading={loadingMunicipios} placeholder="Municipio" >
      {municipios.map((municipio) => (
        <Select.Option value={municipio.id} key={municipio.id}>
          {municipio.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default MunicipiosSelect;
