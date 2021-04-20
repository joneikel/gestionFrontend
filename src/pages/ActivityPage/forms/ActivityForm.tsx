import { Button, Col, Form, Input, Row, Select, message, Progress, Card, Space } from "antd";
import { useState } from "react";
import moment from 'moment';
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
import ImageDeleter from "../components/ImageDeleter";
import { ActivityImage } from "../../../models";

const ActivityForm = () => {

  const axios = useAxios();
  const history = useHistory();

  const _activity: any = history.location.state;
  const hasImages = _activity?.images[0]?.id ? true : false;

  const [form] = Form.useForm();

  const [projectId, setProjectId] = useState<
    string | undefined>(_activity ? _activity.project_id : undefined);
  const [noAplica, setNoAplica] = useState<boolean>(true);

  const [initDate, setInitDate] = useState<
  moment.Moment | undefined>(_activity ? moment(_activity.init_date) : undefined );
  console.log(initDate);
  

  const initial_coordinates = _activity?.lat && _activity?.lng ? { lat: Number(_activity.lat), lng: Number(_activity.lng) } : undefined;
  
  const [availableBudget, loadingAvailableBudget] = useAvaiableBudget(projectId);

  const [program, setProgram] = useState<
    string | undefined>(_activity ? _activity.project.program_id : undefined);

  const [municipio, setMunicipio] = useState<
    string | undefined>(_activity ? _activity.parroquia.municipio_id : undefined);

  const parroquia = _activity ? _activity.parroquia_id : undefined ;

  const [parentInstitution, setParentInstitution] = useState<
    string | undefined>(_activity ? _activity.project.program.institution.parent_id : undefined);

  const [institution, setInstitution] = useState<
    string | undefined>(_activity ? _activity.project.program.institution_id : undefined);

  const [loading, setLoading] = useState<boolean>(false);
  const [estimatedPopulation, setEstimatedPopulation] = useState<
  number | undefined>( _activity ? _activity.estimated_population : undefined);
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
      const response = await axios.post(`/activity${_activity ? `-update/${_activity.id}` : ""}`, data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      message.success(`Actividad ${ _activity ? "actualizada" : "creada"} exitosamente`);
      history.push('/listar-actividades');
      return response;
    } catch (error) {
      message.error(`No se ha podido ${ _activity ? "actualizar" : "crear"} la actividad`);
    } finally {
      setLoading(false);
    }
  };
  const buildFormData = (values: any): FormData => {
    const data = new FormData();
    const { images } = values;
    delete values["images"];
    Object.keys(values).forEach(key => {
      if (values[key] !== undefined) {
        return data.set(key, values[key]);
      }

    });
    images?.forEach((image: any) => {
      data.append("images[]", image.originFileObj);
    });
    return data;
  }

  return (
    <Card title={<CustomPageHeader title="Nueva actividad" />}>
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        form={form}
        initialValues={
          _activity ? {
            name: _activity.name,
            address: _activity.address,
            benefited_population: _activity.benefited_population,
            budget_cost: Number(_activity.budget_cost).toString(),
            conclusion: _activity.conclusion,
            description: _activity.description,
            init_date: initDate  && initDate.format("YYYY-MM-DD"),
            end_date: _activity.end_date,
            estimated_population: estimatedPopulation,
            geolocation: { lat: _activity.lat, lng: _activity.lng },
            municipio_id: municipio,
            parroquia_id: parroquia,
            parentInstitution: parentInstitution,
            institutionId: institution,
            project_id: projectId,
            program_id: program,
            gobernador: _activity.gobernador === true ? "SI" : "NO",
          } : {}
        }
      >
        <Row gutter={10}>
          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              hasFeedback
              name="parentInstitution"
              label="Secretaría Ejecutiva"
              rules={[
                {
                  required: true,
                  message: "Debes seleccionar secretaría ejecutiva.",
                },
              ]}
            >
              <InstitutionsSelect
                initial_value={parentInstitution}
                onlyParent
                onChange={setParentInstitution} />
            </Form.Item>
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              hasFeedback
              name="institutionId"
              label="Institución"
              rules={[
                {
                  required: true,
                  message: "Debes seleccionar secretaría ejecutiva.",
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
              label="Programa"
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
              name="project_id"
              label="Proyecto"
              rules={[
                { required: true, message: "Debes seleccionar el proyecto." },
              ]}
            >
              <ProjectSelect
                initial_value={projectId}
                disabled={!program}
                programId={program}
                onChange={setProjectId} />
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
              label="Descripción"
              rules={[
                {
                  required: true,
                  message: "Debes indicar descripción de la actividad",
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
              label="Costo de la actividad"
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
              label="Asistió el Gobernador"
              rules={[{ required: true, message: "Debes indicar si el gobernador asistió/asistirá a esta actividad" }]}
            >
              <Select
                defaultValue={_activity ? _activity.gobernador === true ? "SI" : "NO" : undefined}
              >
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
              <MunicipiosSelect
                initial_value={municipio}
                onChange={setMunicipio} />
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
              <ParroquiaSelect
                initial_value={parroquia}
                disabled={!municipio} municipio_id={municipio} />
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
              <Input type="date" onChange={(e) => setInitDate(moment(e.currentTarget.value))} />
            </Form.Item>
          </Col>

          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              hasFeedback
              name="end_date"
              label="Fecha de Culminación"
              rules={[
                {
                  required: true,
                  message: "Debes indicar fecha de culminación de la actividad"
                }, {
                  validator: async (_, value) => {
                    let end_date = moment(value);

                    if (initDate && initDate?.diff(end_date) <= 0 || value === undefined) {
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
          <Col lg={3} md={3}>
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
                label="Población Estimada"
                rules={[
                  {
                    required: noAplica,
                    message: "Debes indicar población estimada de la actividad",
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
                label="Población Beneficiada"
                rules={[
                  {
                    pattern: /^\d+$/,
                    message: "Solo puede introducir numeros"
                  }, {
                    validator: async (_, value) => {
                      value = value ? value : 0;
                      console.log(value);
                      let benefitedPoulation = Number(value);
                      let estimatedPopulation1 = Number(estimatedPopulation)

                      if (estimatedPopulation1 >= benefitedPoulation) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject('Población excedida');
                      }
                    }
                  }

                ]}
              >
                <Input />

              </Form.Item>
            </Col>)}
          <Col span={24} style={{ height: 375, width: '100%' }}>
            <Form.Item
              hasFeedback
              name="geolocation"
              label="Geolocalización"

            >
              <div style={{ height: 300, width: '100%' }}>
                <CoordinatesInput
                  activity_institution={parentInstitution}
                  value={initial_coordinates}
                  onChange={(latlng: any) => form.setFieldsValue({ geolocation: latlng })} />
              </div>
            </Form.Item>
          </Col>
          {hasImages && <Col span={24} >
            <Form.Item
              name="stock_images"
              label="Memoria fotográfica"
            >
              <ImageDeleter images={_activity.images.map((image: ActivityImage) => image)} />
            </Form.Item>

          </Col>}
          <Col span={24}>
            <Form.Item
              hasFeedback

              name="images"
              label="Cargar memoria fotográfica"
            >
              <EcUploader />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} disabled={!availableBudget} >
                {_activity ? "Editar" : "Registrar"}
              </Button>
            </Form.Item>
            {loading && <Progress percent={99.9} type='line' status='active' />}
          </Col>
        </Row>
      </Form>
    </Card >
  );
};
export default ActivityForm;
