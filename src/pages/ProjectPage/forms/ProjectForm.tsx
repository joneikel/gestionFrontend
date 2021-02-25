import { Button, Card, Col, Form, Input, message, Row, Select } from "antd";
import React, { useState } from "react";
import ProgramSelect from "../../ActivityPage/components/ProgramSelect";
import { useAxios } from "../../../hooks/useAxios";
import { useHistory } from "react-router-dom";
import InstitutionsSelect from "../../ActivityPage/components/InstitutionSelect";
import ProjectStatusSelect from "../components/ProjectStatusSelect";
import InputBudget from "../components/InputBudget";
import InvestmentAreaSelect from "../components/InvesmentAreaSelect";
import MeasurementUnitSelect from "../components/MeasurementUnitSelect";
import CustomPageHeader from "../../../components/PageHeader";
import InvestmentSubAreaSelect from "../components/InvestmentSubAreaSelect";

const ProjectForm = () => {
  const axios = useAxios();
  const history = useHistory();

  const [loading, setLoading] = useState<boolean>(false);
  const [parentInstitution, setParentInstitution] = useState<
    string | undefined
  >();
  const [institution, setInstitution] = useState<string | undefined>();
  const [investmentArea, setInvestmentArea] = useState <string[] | undefined>();

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const response = await axios.post("project", values);
      message.success("Proyecto creado.");
      history.push("/listar-proyectos");
      return response;
    } catch (error) {
      message.error("No se pudo crear el proyecto.");
    } finally {
      setLoading(false);
    }
  };

  const [program, setProgram] = useState<string | undefined>();

  return (
    <Card title={<CustomPageHeader title="Nuevo proyecto" />}>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Row gutter={10}>
          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              hasFeedback
              name="parentInstitution"
              label="Secretaria Ejecutiva"
              rules={[
                {
                  required: true,
                  message: "Debes seleccionar secretaria ejecutiva.",
                },
              ]}
            >
              <InstitutionsSelect onlyParent onChange={setParentInstitution} />
            </Form.Item>
          </Col>

          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              hasFeedback
              name="institution_id"
              label="Institucion"
              rules={[
                {
                  required: true,
                  message: "Debes seleccionar secretaria ejecutiva.",
                },
              ]}
            >
              <InstitutionsSelect
                disabled={!parentInstitution}
                parentId={parentInstitution}
                onChange={setInstitution}
              />
            </Form.Item>
          </Col>

          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              hasFeedback
              name="program_id"
              label="Programa al que pertence"
              rules={[
                {
                  required: true,
                  message: "Debes indicar nombre del programa.",
                },
              ]}
            >
              <ProgramSelect
                disabled={!institution}
                institutionId={institution}
                onChange={setProgram}
              />
            </Form.Item>
          </Col>

          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              hasFeedback
              name="name"
              label="Nombre del proyecto"
              rules={[
                {
                  required: true,
                  message: "Debe indicar nombre del proyecto",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              hasFeedback
              name="description"
              label="Objetivos del Proyecto"
              rules={[
                {
                  required: true,
                  message: "Objetivos del proyecto.",
                },
              ]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>
          </Col>

          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              hasFeedback
              name="project_status_id"
              label="Status de ejecución"
              rules={[
                {
                  required: true,
                  message: "Debe seleccionar el status de ejecución",
                },
              ]}
            >
              <ProjectStatusSelect />
            </Form.Item>
          </Col>

          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              hasFeedback
              name="is_planified"
              label="¿Planificado?"
              rules={[
                {
                  required: true,
                  message: "Debe seleccionar si este proyecto fue planificado",
                },
              ]}
            >
              <Select>
                <Select.Option value={1}> Si </Select.Option>
                <Select.Option value={0}> No </Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              hasFeedback
              name="budgets"
              label="Presupuesto"
              rules={[
                {
                  required: true,
                  message:
                    "Debes indicar indicar el presupuesto asignado a este Proyecto",
                },
              ]}
            >
              <InputBudget />
            </Form.Item>
          </Col>

          <Col lg={9} md={9} sm={24} xs={24}>
            <Form.Item
              hasFeedback
              name="investment_areas"
              label="Area de Inversión"
              key="investmentArea"
              rules={[
                {
                  required: true,
                  message: "Selecciona el area de inversión",
                },
              ]}
            >
              <InvestmentAreaSelect mode="multiple" onChange={setInvestmentArea} />
            </Form.Item>
          </Col>

          <Col lg={9} md={9} sm={24} xs={24}>
            <Form.Item
              hasFeedback
              name="investment_sub_areas"
              label="Sub-Area de Inversión"
              key="investmentSubArea"
              rules={[
                {
                  required: false,
                  message: "Selecciona el sub area de inversión",
                },
              ]}
            >
              <InvestmentSubAreaSelect
              disabled={!investmentArea}
              investmentAreaIds={investmentArea}
               mode="multiple"/>
            </Form.Item>
          </Col>

          <Col span={3}>
            <Form.Item
              
              hasFeedback
              name="measurement_id"
              label="Unidad de medida"
              rules={[
                {
                  required: true,
                  message: "Indica la unidad de medida",
                },
              ]}
            >
              <MeasurementUnitSelect mode={undefined}/>
            </Form.Item>
          </Col>

          <Col span={3}>
            <Form.Item
              hasFeedback
              name="measurement_value"
              label="Valor de medida"
              rules={[
                {
                  required: true,
                  message: "Indica el valor de medida",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              hasFeedback
              name="init_date"
              label="Fecha de inicio"
              rules={[
                {
                  required: true,
                  message: "Debes indicar fecha de inicio de la actividad",
                },
              ]}
            >
              <Input type="date" />
            </Form.Item>
          </Col>

          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              hasFeedback
              name="end_date"
              label="Fecha de Culminacion"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Input type="date" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Guardar
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default ProjectForm;
