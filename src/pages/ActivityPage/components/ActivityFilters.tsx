import { Button, Card, Row, Select, Col } from 'antd';
import React, { useState } from 'react';
import UserContainer from '../../../unstated/UserContainer';
import InstitutionsSelect from './InstitutionSelect';
import MunicipiosSelect from './MunicipioSelect';
import ParroquiaSelect from './ParroquiaSelect';

const Filters = ({ onChange, default_institution }: { onChange: Function, default_institution?: string }) => {

  const { user } = UserContainer.useContainer();
  const isAdmin = user?.role.name === "super_admin";

  const [filters, setFilters] = useState<{
    institution_id?: string,
    municipio_id?: string,
    parroquia_id?: string,
    gobernador?: "SI" | "NO" | "TODOS"
  }>({
    institution_id: default_institution,
    municipio_id: undefined,
    parroquia_id: undefined,
    gobernador: undefined
  });

  const handleChange = (f: any) => {
    onChange(f);
  }

  return (
    <Card className="filter-card floating-element">
      <Row gutter={[10, 10]} >
        <Col span={10} >
          <InstitutionsSelect
            onlyParent={isAdmin ? true : undefined}
            parentId={isAdmin ? undefined : user?.institution.id}
            onChange={(institution_id: string) => {
              handleChange({ ...filters, institution_id });

              setFilters({ ...filters, institution_id })
            }
            } />
        </Col>
        <Col span={5} >
          <MunicipiosSelect
            onChange={(municipio_id: string) => {
              handleChange({ ...filters, municipio_id });

              setFilters({ ...filters, municipio_id })
            }
            } />
        </Col>
        <Col span={5} >
          <ParroquiaSelect
            onChange={(parroquia_id: string) => {
              setFilters({ ...filters, parroquia_id })
              handleChange({ ...filters, parroquia_id });
            }
            }
            municipio_id={filters.municipio_id} />
        </Col>

        <Col span={5} >

          <Select
            placeholder="Gobernador"
            style={{ width: '100%' }}
            onChange={(gobernador: "SI" | "NO" | "TODOS") => {
              setFilters({ ...filters, gobernador })
              handleChange({ ...filters, gobernador });
            }}>
            <Select.Option value={"TODOS"}>TODOS</Select.Option>
            <Select.Option value={"SI"}>Si</Select.Option>
            <Select.Option value={"NO"}>No</Select.Option>
          </Select>
        </Col>

        <Col span={4} >
          <Button
            type="primary"
            onClick={() => {
              setFilters({
                institution_id: default_institution,
                municipio_id: undefined,
                parroquia_id: undefined,
                gobernador: undefined
              })
              handleChange({
                institution_id: default_institution,
                municipio_id: undefined,
                parroquia_id: undefined,
                gobernador: undefined
              });
            }}>Limpiar filtros</Button>
        </Col>


      </Row>
    </Card>
  );
}

export default Filters;