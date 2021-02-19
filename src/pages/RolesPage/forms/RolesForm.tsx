import { Button, Card, Col, Form, Input, message, Row } from 'antd';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CustomPageHeader from '../../../components/PageHeader';
import { useAxios } from '../../../hooks/useAxios';

const RolesForm = () => {

    const axios = useAxios();
    const history = useHistory();
  
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = async (values: any) => {
      console.log(values);
      setLoading(true);
      try {
          const response = await axios.post('role', values);
          message.success("Rol creado.");
          history.push('/estadisticas');
          return response;
      } catch (error) {
          message.error("No se puedo crear el rol");
      } finally {
          setLoading(false);
      }
  };
  
    return (
      <Card title={<CustomPageHeader title="Nuevo Rol" />}>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Row gutter={10} >
  
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                hasFeedback
                name="name"
                label="Nombre"
                rules={[
                  {
                    required: true,
                    message: "Debe seleccionar un nombre.",
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

export default RolesForm;