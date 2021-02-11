import { Button, Card, Col, Row, Select } from 'antd';
import React, { useState } from 'react';
import InstitutionsSelect from '../../ActivityPage/components/InstitutionSelect';
import InvestmentAreaSelect from './InvesmentAreaSelect';
import ProjectStatusSelect from './ProjectStatusSelect';

const ProjectFilters = ({ onChange }: { onChange: Function }) => {

  const [filters, setFilters] = useState<{
    institution_id?: string,
    investment_areas?: string[],
    project_status_id?: string,
    is_planified?: number
  }>({
    institution_id: undefined,
    investment_areas: undefined,
    project_status_id: undefined,
    is_planified: undefined
  });

  const handleChange = (f: any) => {
    onChange(f);
  }

  return (
    <Card className="filter-card">
      <Row gutter={10}>
        <Col span={6}>
          <InstitutionsSelect
            value={filters.institution_id}
            onlyParent
            onChange={(institution_id: string) => {
              handleChange({ ...filters, institution_id });
              setFilters({ ...filters, institution_id })
            }
            } />
        </Col>
        <Col span={6}>
          <InvestmentAreaSelect
            value={filters.investment_areas}
            mode="multiple" onChange={(investment_areas: string[]) => {
              handleChange({ ...filters, investment_areas });
              setFilters({ ...filters, investment_areas })
            }} />
        </Col>
        <Col span={6}>
          <ProjectStatusSelect
            value={filters.project_status_id}
            onChange={(project_status_id: string) => {
              handleChange({ ...filters, project_status_id });
              setFilters({ ...filters, project_status_id })
            }} />
        </Col>
        <Col span={6}>
          <Select
            value={filters.is_planified}
            placeholder="¿Planificada?"
            style={{ width: '100%' }}
            onChange={(is_planified: number) => {
              handleChange({ ...filters, is_planified });
              setFilters({ ...filters, is_planified })
            }}>
            <Select.Option value={1} > Si </Select.Option>
            <Select.Option value={0} > No </Select.Option>
          </Select>
        </Col>
        <Col span={6}>
          <Button onClick={() => {
            setFilters({
              institution_id: undefined,
              investment_areas: undefined,
              project_status_id: undefined,
              is_planified: undefined
            })
            handleChange({
              institution_id: undefined,
              investment_areas: undefined,
              project_status_id: undefined,
              is_planified: undefined
            });
          }}>Limpiar filtros</Button>
        </Col>
      </Row>
    </Card>
  );
}

export default ProjectFilters;