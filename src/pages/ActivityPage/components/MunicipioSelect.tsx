import { Select } from "antd";
import React from "react";
import { useMunicipios } from "../../../hooks/useMunicipios";

const MunicipiosSelect = ({
  value,
  onChange,
}: {
  value?: string;
  onChange?: Function;
}) => {
  const [municipios, loadingMunicipios] = useMunicipios();

  const handleChange = (v: string) => {
    onChange && onChange(v);
  };

  return (
    <Select style={{width: '100%'}} onChange={handleChange} loading={loadingMunicipios} placeholder="Municipio" >
      {municipios.map((municipio) => (
        <Select.Option value={municipio.id} key={municipio.id}>
          {municipio.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default MunicipiosSelect;
