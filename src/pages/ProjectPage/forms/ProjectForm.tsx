import { Button, Card, Col, Form, Input, message, Row, Select } from "antd";
import React, { useState } from "react";
import ProgramSelect from "../../ActivityPage/components/ProgramSelect";
import { useAxios } from "../../../hooks/useAxios";
import { useHistory } from "react-router-dom";
import moment from 'moment';
import InstitutionsSelect from "../../ActivityPage/components/InstitutionSelect";
import ProjectStatusSelect from "../components/ProjectStatusSelect";
import InputBudget from "../components/InputBudget";
import InvestmentAreaSelect from "../components/InvesmentAreaSelect";
import CustomPageHeader from "../../../components/PageHeader";
import InvestmentSubAreaSelect from "../components/InvestmentSubAreaSelect";
import ImputMeasurementUnit from "../components/ImputMeasurementUnit";
import FormItem from "antd/lib/form/FormItem";
import { Budget, InvestmentSubArea, Project } from "../../../models";

const ProjectForm = () => {
  const axios = useAxios();
  const history = useHistory();
  const _project: any = history.location.state;//DEFINED WHEN EDITING
  console.log(_project);

  const [loading, setLoading] = useState<boolean>(false);

  const [parentInstitution, setParentInstitution] = useState<string | undefined>(_project?.program.institution?.parent_id);

  const [institution, setInstitution] = useState<string | undefined>(_project?.program.institution_id);
  const [program, setProgram] = useState<string | undefined>(_project?.program_id);

  const [initDate, setInitDate] = useState<moment.Moment | undefined>(
    _project ? moment(_project.init_date) : undefined
  );

  const current_end_date = _project && _project.end_date ? moment(_project.end_date) : undefined;
  const current_sub_investment_areas = _project?.investment_sub_areas.map((x: InvestmentSubArea) => x.id);

  const [investmentArea, setInvestmentArea] = useState<string[] | undefined>(
    _project ? Array.from(new Set(_project.investment_sub_areas.map((x: InvestmentSubArea) => x.investment_area_id))) : undefined
  );

  const [isPlanified, setIsPlanified] = useState(1);

  const handleSubmit = async (values: any) => {

    console.log(values);
    values.measurement_units = values.measurement.map((x: any) => ({ [x.measurement_unit_id]: { proposed_goal: Number(x.proposed_goal), reached_goal: Number(x.reached_goal) } }));

    values.measurement_units = values.measurement_units.reduce((x: any, y: any) => {
      x = { ...x, ...y };
      return x;
    })
    values.budgets = values.budgets.map((budget: any) => {
      budget.value = Number(budget.value.replace("Bs", "").replace(/\./g, "").replace(/\,/g, "."))
      budget.dollar_value = Number(budget.dollar_value.replace("$", "").replace(/\./g, "").replace(/\,/g, "."))
      return budget;
    })


    console.log(values);

    setLoading(true);
    try {
      const response = await axios.post(`project${ _project ? `-update/${_project.id}`: ``}`, values);
      message.success(`Proyecto ${_project ? "editado" : "creadp" }.`);
      history.push("/listar-proyectos");
      return response;
    } catch (error) {
      message.error(`No se puedo ${_project ? "editar" : "crear" } el proyecto .`);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Card title={<CustomPageHeader title="Nuevo proyecto" />} className="floating-element">
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={_project ? {
          parentInstitution: parentInstitution,
          institution_id: institution,
          program_id: program,
          name: _project.name,
          description: _project.description,
          project_status_id: _project.project_status_id,
          is_planified: _project.is_planified,
          init_date: initDate && initDate.format("YYYY-MM-DD"),
          end_date: current_end_date && current_end_date.format("YYY-MM-DD"),
          investment_areas: investmentArea,
          investment_sub_areas: current_sub_investment_areas

        } : {}}
      >
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
              <InstitutionsSelect initial_value={parentInstitution} onlyParent onChange={setParentInstitution} />
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
                initial_value={institution}
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
                initial_value={program}
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
                  required: false,
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
              <Select defaultValue={_project?.is_planified === true ? 1 : undefined} onChange={(value: number) => setIsPlanified(value)}>
                <Select.Option value={1}> Si </Select.Option>
                <Select.Option value={0}> No </Select.Option>
              </Select>
            </Form.Item>
          </Col>
          {/* {isPlanified === 0 && (
            <Col span={24}>
              <Form.Item
                hasFeedback
                name="justification"
                label="¿Por que no es planificado este projecto?"
                rules={[
                  {
                    required: true,
                    message: "Justifique, ¿Por que no es planificado?.",
                  },
                ]}
              >
                <Input.TextArea rows={3} />
              </Form.Item>
            </Col>
          )} */}

          <Col span={24}>
            <Form.Item
              hasFeedback
              name="budgets"
              label="Presupuesto"
              rules={[
                {
                  required: true,
                  message:
                    "Debes indicar el presupuesto asignado a este Proyecto",
                },
              ]}
            >
              <InputBudget initial_budgets={_project?.budgets} />
            </Form.Item>
          </Col>

          <Col lg={12} md={12} sm={24} xs={24}>
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
              <InvestmentAreaSelect
                initial_value={investmentArea}
                mode="multiple"
                onChange={setInvestmentArea}
              />
            </Form.Item>
          </Col>

          <Col lg={12} md={12} sm={24} xs={24}>
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
                initial_value={current_sub_investment_areas}
                disabled={!investmentArea}
                investmentAreaIds={investmentArea}
                mode="multiple"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              hasFeedback
              name="measurement"
              label="Unidades de Medida"
              rules={[
                {
                  required: true,
                  message:
                    "Debes indicar la unidad de medida",
                },
              ]}
            >
              <ImputMeasurementUnit initial_value={_project?.measurement_unit} />
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
                  message: "Debes indicar fecha de inicio del projecto",
                },
              ]}
            >
              <Input type="date" onChange={(e) => setInitDate(moment(e.currentTarget.value))} />
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
                }, {
                  validator: async (_, value) => {
                    let end_date = moment(value);

                    if (initDate && initDate?.diff(end_date) < 0 || value === undefined /* || value === null */) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject('Fecha de culminación no puede ser anterior a la de inicio');
                    }
                  }
                }
              ]}
            >
              <Input type="date" />
            </Form.Item>
            
          </Col>
          { _project &&<Col lg={24} md={24} sm={24} xs={24}>
            <FormItem
              hasFeedback
              name="observation"
              label="Justificación de modificado"
              rules={[
                {
                  required: true,
                  message: "Justifique porqué este proyecto está siendo modificado"
                }
              ]}>
              <Input.TextArea rows={3} />

            </FormItem>
          </Col> }

          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                {_project ? "Editar" :"Guardar"}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default ProjectForm;
