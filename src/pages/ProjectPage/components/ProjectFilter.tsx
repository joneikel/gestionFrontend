import { Button, Card, Col, Row, Select } from "antd";
import React, { useState } from "react";
import UserContainer from "../../../unstated/UserContainer";
import InstitutionsSelect from "../../ActivityPage/components/InstitutionSelect";
import InvestmentAreaSelect from "./InvesmentAreaSelect";
import ProjectStatusSelect from "./ProjectStatusSelect";

const ProjectFilters = ({ onChange, default_institution }: { onChange: Function, default_institution?: string }) => {
  
  const {user} = UserContainer.useContainer();
  const isAdmin = user?.role.name === "super_admin";
  
  const [filters, setFilters] = useState<{
    institution_id?: string;
    investment_areas?: string[];
    project_status_id?: string;
    is_planified?: number;
  }>({
    institution_id: default_institution,
    investment_areas: undefined,
    project_status_id: undefined,
    is_planified: undefined,
  });

  const handleChange = (f: any) => {
    onChange(f);
  };

  return (
    <Row gutter={[10,10]}>
      <Col span={10}>
        <InstitutionsSelect
          value={filters.institution_id}
          onlyParent={ isAdmin ? true : undefined }
          parentId={ isAdmin ? undefined : user?.institution.id}
          onChange={(institution_id: string) => {
            handleChange({ ...filters, institution_id });
            setFilters({ ...filters, institution_id });
          }}
        />
      </Col>
      <Col span={5}>
        <InvestmentAreaSelect
          value={filters.investment_areas}
          mode="multiple"
          onChange={(investment_areas: string[]) => {
            handleChange({ ...filters, investment_areas });
            setFilters({ ...filters, investment_areas });
          }}
        />
      </Col>
      <Col span={5}>
        <ProjectStatusSelect
          value={filters.project_status_id}
          onChange={(project_status_id: string) => {
            handleChange({ ...filters, project_status_id });
            setFilters({ ...filters, project_status_id });
          }}
        />
      </Col>
      <Col span={5}>
        <Select
          value={filters.is_planified}
          placeholder="¿Planificada?"
          style={{ width: "100%" }}
          onChange={(is_planified: number) => {
            handleChange({ ...filters, is_planified });
            setFilters({ ...filters, is_planified });
          }}
        >
          <Select.Option value={1}> Si </Select.Option>
          <Select.Option value={0}> No </Select.Option>
        </Select>
      </Col>
      <Col span={4}>
        <Button
          type="primary"
          onClick={() => {
            setFilters({
              institution_id: default_institution,
              investment_areas: undefined,
              project_status_id: undefined,
              is_planified: undefined,
            });
            handleChange({
              institution_id: default_institution,
              investment_areas: undefined,
              project_status_id: undefined,
              is_planified: undefined,
            });
          }}
        >
          Limpiar filtros
        </Button>
      </Col>
    </Row>
  );
};

export default ProjectFilters;
