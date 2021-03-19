import { Button, Col, Form, Input, Row, Select, message, Progress, Card } from "antd";
import React, { useState } from "react";
import InstitutionsSelect from "../components/InstitutionSelect";
import MunicipiosSelect from "../components/MunicipioSelect";
import ParroquiaSelect from "../components/ParroquiaSelect";
import ProgramSelect from "../components/ProgramSelect";
import ProjectSelect from "../components/ProjectSelect";
import { useAxios } from "../../../hooks/useAxios";
import { useHistory } from "react-router-dom";
import EcUploader from "../components/EcUploader";
import CustomPageHeader from "../../../components/PageHeader";
import { useAvaiableBudget } from "../../../hooks/useAvailableBudget";
import Checkbox from "antd/lib/checkbox/Checkbox";
import NumberFormat from "react-number-format";
import { moneyFormatter } from "../../../helpers";
import CoordinatesInput from "./CoordinatesInput";

const ActivityForm = () => {
  const axios = useAxios();
  const history = useHistory();
  const [form] = Form.useForm();

  const [projectId, setProjectId] = useState<string | undefined>(undefined);
  const [noAplica,setNoAplica] = useState<boolean>(true);

  console.log(noAplica);

  const [availableBudget, loadingAvailableBudget] = useAvaiableBudget(projectId);


  const [program, setProgram] = useState<string | undefined>();
  const [municipio, setMunicipio] = useState<string | undefined>();
  const [parentInstitution, setParentInstitution] = useState<
    string | undefined
  >();

  const [institution,setInstitution] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [estimatedPopulation, setEstimatedPopulation] = useState<number | undefined>();
  const [population, setPopulation] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const budgetActivity = values.budget_cost.replace(/\./g, "").replace(/\,/g, ".");
      values.budget_cost = budgetActivity;
      console.log(values);
      values.lat = values.geolocation.lat;
      values.lng = values.geolocation.lng;
      const data = buildFormData(values);
      const response = await axios.post('/activity', data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      message.success("Actividad creada exitosamente");
      history.push('/listar-actividades');
      return response;
    } catch (error) {
      message.error("No se ha podido crear la actividad");
    } finally {
      setLoading(false);
    }
  };
  const buildFormData = (values: any): FormData => {
    const data = new FormData();
    const { images } = values;
    delete values["images"];
    Object.keys(values).forEach(key => {
      data.set(key, values[key]);
    });
    images?.forEach((image: any) => {
      data.append("images[]", image.originFileObj);
    });
    return data;
  }

  return (
    <Card title={<CustomPageHeader title="Nueva actividad" />}>
      <Form layout="vertical" onFinish={handleSubmit} form={form} >
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
              name="institutionId"
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
              label="Programa"
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
              name="project_id"
              label="Proyecto"
              rules={[
                { required: true, message: "Debes seleccionar el proyecto." },
              ]}
            >
              <ProjectSelect disabled={!program} programId={program} onChange={setProjectId} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              hasFeedback
              name="name"
              label="Actividad"
              rules={[
                {
                  required: true,
                  message: "Debes indicar nombre de la actividad",
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
              label="Descripcion"
              rules={[
                {
                  required: true,
                  message: "Debes indicar descripcion de la actividad",
                },
              ]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>
          </Col>

          <Col lg={6} md={6} sm={24} xs={24}>
            <Form.Item
              hasFeedback
              name="available_budget"
              label="Presupuesto disponible"
              rules={[
                {
                  required: false,
                  message: "Debes indicar el presupuesto",
                },
                {
                  pattern: /^\d+$/,
                  message: "Solo puede introducir numeros"
                }
              ]}
            >
              <div className="budget-tag">

                {availableBudget &&
                  moneyFormatter(availableBudget.toString())}

              </div>
            </Form.Item>
          </Col>

          <Col lg={10} md={10} sm={24} xs={24}>
            <Form.Item
              hasFeedback
              name="budget_cost"
              dependencies={['available_budget']}
              label="Consto de la actividad"
              rules={[
                {
                  required: true,
                  message: "Debes indicar el presupuesto",
                },
                {
                  validator: async (_, value) => {
                    const fixed_value = value.replace(/\./g, "").replace(/\,/g, ".");
                    if (availableBudget && availableBudget >= fixed_value) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject('Presupuesto excedido');
                    }
                  }
                }
              ]}
            >
              <NumberFormat
                class="ant-input"
                thousandSeparator={"."}
                decimalScale={2}
                decimalSeparator={","}
                maxLength={21}
              />
            </Form.Item>
          </Col>
          <Col lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              hasFeedback
              name="gobernador"
              label="Asistio el Gobernador"
              rules={[{ required: true, message: "Debes indicar" }]}
            >
              <Select>
                <Select.Option value={"SI"}>Si</Select.Option>
                <Select.Option value={"NO"}>No</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col lg={6} md={6} sm={24} xs={24}>
            <Form.Item
              hasFeedback
              name="municipio_id"
              label="Municipio"
              rules={[
                {
                  required: true,
                  message: "Debes indicar el municipio",
                },
              ]}
            >
              <MunicipiosSelect onChange={setMunicipio} />
            </Form.Item>
          </Col>
          <Col lg={6} md={6} sm={24} xs={24}>
            <Form.Item
              hasFeedback
              name="parroquia_id"
              label="Parroquia"
              rules={[
                {
                  required: true,
                  message: "Debes indicar la parroquia",
                },
              ]}
            >
              <ParroquiaSelect disabled={!municipio} municipio_id={municipio} />
            </Form.Item>
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              hasFeedback
              name="address"
              label="Sector"
              rules={[
                {
                  required: true,
                  message: "Debes indicar direccion de la actividad",
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
                  required: true,
                  message: "Debes indicar fecha de culminacion de la actividad",
                },
              ]}
            >
              <Input type="date" />
            </Form.Item>
          </Col>
          <Col lg={3} md={3} sm={24} xs={24}>
            <Checkbox

              onChange={(e) => {
                setPopulation(e.target.checked);
                setNoAplica(!noAplica);
              }}
            >
              No aplica
                </Checkbox>
          </Col>

          {population === false && (
            <Col lg={10} md={10} sm={24} xs={24}>
              <Form.Item
                hasFeedback
                name="estimated_population"
                label="Poblacion Estimada"
                rules={[
                  {
                    required: noAplica,
                    message: "Debes indicar poblacion estimada de la actividad",
                  },
                  {
                    pattern: /^\d+$/,
                    message: "Solo puede introducir numeros"
                  }
                ]}
              >
                <Input onChange={e => setEstimatedPopulation(Number(e.target.value))} />
              </Form.Item>
            </Col>
          )}
          {population === false && (
            <Col lg={11} md={11} sm={24} xs={24}>
              <Form.Item
                hasFeedback
                name="benefited_population"
                label="Poblacion Beneficiada"
                rules={[
                  {
                    required: noAplica,
                    message: "Debes indicar poblacion benefiada de la actividad",
                  },
                  {
                    pattern: /^\d+$/,
                    message: "Solo puede introducir numeros"
                  }, {
                    validator: async (_, value) => {
                      let benefitedPoulation = Number(value);
                      let estimatedPopulation1 = Number(estimatedPopulation)

                      if (estimatedPopulation1 >= benefitedPoulation) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject('Poblacion excedida');
                      }
                    }
                  }

                ]}
              >
                <Input />

              </Form.Item>
            </Col>)}
          <Col span={24} style={{ height: 300, width: '100%' }}>
            <Form.Item
              hasFeedback
              name="geolocation"
              label="Geolocalización"

            >
              <div style={{ height: 300, width: '100%' }}>
                <CoordinatesInput onChange={(latlng: any) => form.setFieldsValue({ geolocation: latlng })} />
              </div>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              hasFeedback
              name="images"
              label="Memoria fotografica"
              rules={[
                {
                  required: true,
                  message: "Debes indicar poblacion benefiada de la actividad",
                },
              ]}
            >
              <EcUploader />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} >
                Registrar
              </Button>
            </Form.Item>
            {loading && <Progress percent={99.9} type='line' status='active' />}
          </Col>
        </Row>
      </Form>
    </Card>
  );
};
export default ActivityForm;
