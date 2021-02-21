import { Button, Col, Form, Input, Row, Select, message, Progress, Card, InputNumber, Tag } from "antd";
import React, { useEffect, useState } from "react";
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

const ActivityForm = () => {
  const axios = useAxios();
  const history = useHistory();
  const [form] =  Form.useForm();

  const [projectId,setProjectId] = useState<string|undefined>(undefined);

  const [availableBudget,loadingAvailableBudget] = useAvaiableBudget(projectId);

  const [program, setProgram] = useState<string | undefined>();
  const [municipio, setMunicipio] = useState<string | undefined>();
  const [parentInstitution, setParentInstitution] = useState<
    string | undefined
  >();
  const [loading, setLoading] = useState<boolean>(false);

  /* useEffect(()=>{
    form.setFieldsValue({available_budget: availableBudget});
  },[availableBudget]) */


  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
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
                onChange={setParentInstitution}
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
              <div className="budget-tag">Bs.{availableBudget}</div>
            </Form.Item>
          </Col>

          <Col lg={10} md={10} sm={24} xs={24}>
            <Form.Item
              hasFeedback
              name="budget_cost"
              dependencies={['available_budget']}
              label="Presupuesto Invertido"
              rules={[
                {
                  required: true,
                  message: "Debes indicar el presupuesto",
                },
                {
                  pattern: /^\d+$/,
                  message: "Solo puede introducir numeros"
                },{
                  validator: async (_,value) => {
                    let fixed_value = Number(value);
                    if (availableBudget && availableBudget >= fixed_value ){
                      return Promise.resolve();
                    } else {
                      return Promise.reject('Presupuesto excedido');
                    }
                  } 
                }
              ]}
            >
              <Input />
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

          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              hasFeedback
              name="estimated_population"
              label="Poblacion Estimada"
              rules={[
                {
                  required: true,
                  message: "Debes indicar poblacion estimada de la actividad",
                },
                {
                  pattern: /^\d+$/,
                  message: "Solo puede introducir numeros"
                }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              hasFeedback
              name="benefited_population"
              label="Poblacion Beneficiada"
              rules={[
                {
                  required: true,
                  message: "Debes indicar poblacion benefiada de la actividad",
                },
                {
                  pattern: /^\d+$/,
                  message: "Solo puede introducir numeros"
                }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              hasFeedback
              name="images"
              label="Imagenes"
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
