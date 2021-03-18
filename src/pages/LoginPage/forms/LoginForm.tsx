import { Button, Col, Divider, Form, Input, message, Row } from "antd";
import React, { useState } from "react";
import { useAxios } from "../../../hooks/useAxios";
import { useHistory } from "react-router-dom";
import UserContainer from "../../../unstated/UserContainer";

const LoginForm = () => {
  const axios = useAxios();
  const history = useHistory();
  const userState = UserContainer.useContainer();

  const [loading, setLoading] = useState<boolean>(false);


  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const response = await axios.post("login", values);
      let loginInformation = {
        name: response.data.data.name,
        access_token: response.data.token,
        scopes: response.data.data.scopes,
        institution: response.data.data.institution,
        role: response.data.data.role,
      }
      userState.login(loginInformation);
      return response;
    } catch (error) {
      message.error("Error de credenciales.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: '100%', height: '60vh', background: "#fff", padding: '10px 10px' }}>
      <h3 className="login-title" >Inicio de sesión</h3>
      <Divider />
      <Form layout="vertical" onFinish={handleSubmit}>
        <Row>
          <Col span={24}>
            <Form.Item
              hasFeedback
              name="email"
              label="Correo"
              rules={[
                { required: true, message: "Debes indicar tu correo" },
                {
                  pattern: /\w+@\w+\.\w+/,
                  message: "Debes coloca un correo valido.",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              hasFeedback
              name="password"
              label="Contraseña"
              rules={[
                { required: true, message: "Debes indicar tu contraseña" },
                { min: 6, message: "Debe tener al menos 6 caracteres alfanumericos" },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Button loading={loading} type="primary" htmlType="submit" >
                Acceder
            </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default LoginForm;
