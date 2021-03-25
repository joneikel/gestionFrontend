import { Button, Card, Col, Form, Input, message, Row, Select } from 'antd';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CustomPageHeader from '../../../components/PageHeader';
import { useAxios } from '../../../hooks/useAxios';
import { useStoredScopes } from '../../../hooks/useStoredScopes';
import ModuleSelect from '../components/ModuleSelect';

const ScopeForm = () => {

  const axios = useAxios();
  const history = useHistory();
  const scopes = useStoredScopes();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    console.log(values);
    setLoading(true);
    try {
        const response = await axios.post('scopes', values);
        message.success("Scope creado.");
        history.push('/estadisticas');
        return response;
    } catch (error) {
        message.error("No se puedo crear el scope");
    } finally {
        setLoading(false);
    }
};

  return (
    <Card title={<CustomPageHeader title="Nuevo Scope" />} className="floating-element">
      <Form layout="vertical" onFinish={handleSubmit}>
        <Row gutter={10} >

          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              hasFeedback
              name="module_id"
              label="Modulo"
              rules={[
                {
                  required: true,
                  message: "Debe seleccionar un Modulo.",
                },
              ]}>
              <ModuleSelect />
            </Form.Item>
          </Col>

          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              hasFeedback
              name="name"
              label="Nombre"
              rules={[
                {
                  required: true,
                  message: "Debe escribir el nombre del scope.",
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>

          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              hasFeedback
              name="scope"
              label="Scope"
              rules={[
                {
                  required: true,
                  message: "Debe escribir el scope.",
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} >
                Guardar
                </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}

export default ScopeForm;