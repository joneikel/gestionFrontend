import { Button, Card, Select, Space } from 'antd';
import React, { useState } from 'react';
import InstitutionsSelect from './InstitutionSelect';
import MunicipiosSelect from './MunicipioSelect';
import ParroquiaSelect from './ParroquiaSelect';

const Filters = ({ onChange }: { onChange: Function }) => {

  const [filters, setFilters] = useState<{
    institution_id?: string,
    municipio_id?: string,
    parroquia_id?: string,
    gobernador?: "SI" | "NO" | "TODOS"
  }>({
    institution_id: undefined,
    municipio_id: undefined,
    parroquia_id: undefined,
    gobernador: undefined
  });

  const handleChange = (f: any) => {
    onChange(f);
  }

  return (
    <Card>
      <Space>
        <InstitutionsSelect onlyParent
          onChange={(institution_id: string) => {
            handleChange({ ...filters, institution_id });

            setFilters({ ...filters, institution_id })
          }
          } />
        <MunicipiosSelect
          onChange={(municipio_id: string) => {
            handleChange({ ...filters, municipio_id });

            setFilters({ ...filters, municipio_id })
          }
          } />
        <ParroquiaSelect
          onChange={(parroquia_id: string) => {
            setFilters({ ...filters, parroquia_id })
            handleChange({ ...filters, parroquia_id });
          }
          }
          municipio_id={filters.municipio_id} />
        <Select
          style={{ width: '100%' }}
          onChange={(gobernador: "SI" | "NO" | "TODOS") => {
            setFilters({ ...filters, gobernador })
            handleChange({ ...filters, gobernador });
          }}>
          <Select.Option value={"TODOS"}>TODOS</Select.Option>
          <Select.Option value={"SI"}>Si</Select.Option>
          <Select.Option value={"NO"}>No</Select.Option>
        </Select>
        <Button onClick={() => {
          setFilters({
            institution_id: undefined,
            municipio_id: undefined,
            parroquia_id: undefined,
            gobernador: undefined
          })
          handleChange({
            institution_id: undefined,
            municipio_id: undefined,
            parroquia_id: undefined,
            gobernador: undefined
          });
        }}>Limpiar filtros</Button>
      </Space>
    </Card>
  );
}

export default Filters;