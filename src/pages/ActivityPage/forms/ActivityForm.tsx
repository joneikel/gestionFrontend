import { Button, Col, Form, Input, Row, Select, message } from "antd";
import React, { useState } from "react";
import ActivityImpactSelect from "../../LoginPage/components/ActivityImpactSelect";
import InstitutionsSelect from "../components/InstitutionSelect";
import MunicipiosSelect from "../components/MunicipioSelect";
import ParroquiaSelect from "../components/ParroquiaSelect";
import ProgramSelect from "../components/ProgramSelect";
import ProjectSelect from "../components/ProjectSelect";
import { useAxios } from "../../../hooks/useAxios";
import { useHistory } from "react-router-dom";
import EcUploader from "../components/EcUploader";

const ActivityForm = () => {
  const axios = useAxios();
  const history = useHistory();

  const [program, setProgram] = useState<string | undefined>();
  const [municipio, setMunicipio] = useState<string | undefined>();
  const [parentInstitution, setParentInstitution] = useState<
    string | undefined
  >();
  const [loading, setLoading] = useState<boolean>(false);


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
      history.push('/nueva-actividad');
      return response;
    } catch (error) {
      message.error("No se ha podido crear la actividad");
    } finally {
      setLoading(false);
    }
  };

  const buildFormData = (values: any) : FormData => {
    const data = new FormData();
    const { images } = values;
    delete values["images"];
    Object.keys(values).forEach(key => {
      data.set(key, values[key]);
    });
    images?.forEach((image: any) => {
      data.append("images", image.originFileObj);
    });
    return data;
  }

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Row gutter={10}>
        <Col span={12}>
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
        <Col span={12}>
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
        <Col span={12}>
          <Form.Item
            hasFeedback
            name="program"
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
        <Col span={12}>
          <Form.Item
            hasFeedback
            name="project"
            label="Proyecto"
            rules={[
              { required: true, message: "Debes seleccionar el proyecto." },
            ]}
          >
            <ProjectSelect disabled={!program} programId={program} />
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
        <Col span={12}>
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
        <Col span={12}>
          <Form.Item
            hasFeedback
            name="municipio"
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
        <Col span={12}>
          <Form.Item
            hasFeedback
            name="parroquia"
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
        <Col span={12}>
          <Form.Item
            hasFeedback
            name="address"
            label="Dirección"
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
        <Col span={12}>
          <Form.Item
            hasFeedback
            name="initDate"
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

        <Col span={12}>
          <Form.Item
            hasFeedback
            name="endDate"
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

        <Col span={8}>
          <Form.Item
            hasFeedback
            name="estimatedPopulation"
            label="Poblacion Estimada"
            rules={[
              {
                required: true,
                message: "Debes indicar poblacion estimada de la actividad",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            hasFeedback
            name="benefitedPopulation"
            label="Poblacion Beneficiada"
            rules={[
              {
                required: true,
                message: "Debes indicar poblacion benefiada de la actividad",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
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
        </Col>
      </Row>
    </Form>
  );
};
export default ActivityForm;
