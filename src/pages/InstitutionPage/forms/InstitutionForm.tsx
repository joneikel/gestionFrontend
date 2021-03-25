import { Button, Card, Col, Form, Input, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import InstitutionsSelect from "../../ActivityPage/components/InstitutionSelect";
import { useAxios } from "../../../hooks/useAxios";
import { useParams } from "react-router-dom";
import { AxiosInstance } from "axios";
import { useForm } from "antd/lib/form/Form";
import CustomPageHeader from "../../../components/PageHeader";

const InstitutionForm = () => {
  const axios = useAxios();
  const params = useParams() as { institution_id?: string };
  const [parentInstitution, setParentInstitution] = useState<string | undefined>();
  const [form] = useForm();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (params.institution_id)
      getInsitution(params.institution_id, axios)
        .then((i) => {
          form.setFieldsValue(i);
        })
        .catch(err => message.error("Ha ocurrido un error"));
  }, []);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      if (!params.institution_id) {
        await createInstitution(values, axios);
      } else {
        await updateInstitution(values, params.institution_id, axios);
      }
    } catch (error) {
      message.error("No Se puedo crear el la institución.");
    } finally {
      setLoading(false);
      form.resetFields();
    }
  };

  return ( 
      <Card title={<CustomPageHeader title="Nueva Secretaría" />} className="floating-element">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={10}>
          <Col span={12}>
            <Form.Item
              hasFeedback
              name="parent_id"
              label="Secretaria Ejecutiva a la que pertence"
              rules={[
                {
                  required: false,
                  message: "Debes seleccionar secretaría ejecutiva.",
                },
              ]}
            >
              <InstitutionsSelect onlyParent onChange={setParentInstitution} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              hasFeedback
              name="name"
              label="Nombre de la institución"
              rules={[
                {
                  required: true,
                  message: "Debes indicar el nombre de la institución.",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              hasFeedback
              name="mision"
              label="Mision de la institución"
              rules={[
                {
                  required: true,
                  message: "Debes indicar la misión de la institución.",
                },
              ]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              hasFeedback
              name="vision"
              label="Vision de la institución"
              rules={[
                {
                  required: true,
                  message: "Debes indicar la visión de la institución.",
                },
              ]}
            >
              <Input.TextArea rows={3} />
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

async function getInsitution(institution_id: string, axios: AxiosInstance) {
  const resp = await axios.get(`/institution/${institution_id}`);
  return resp.data;
}

async function createInstitution(values: any, axios: AxiosInstance) {
  const response = await axios.post("/institution", values);
  message.success("Institución creada.");
  return response;
}

async function updateInstitution(values: any, id: string, axios: AxiosInstance) {
  const response = await axios.patch(`/institution/${id}`, values);
  message.success("Institución actualizada.");
  return response;
}

export default InstitutionForm;
