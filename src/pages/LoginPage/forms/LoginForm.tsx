import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";
import { useAxios } from "../../../hooks/useAxios";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
  const axios = useAxios();
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (values: any) => {
    console.log(values);
    setLoading(true);
    try {
      const response = await axios.post("login", values);
      message.success("Registro exitoso.");
      history.push("/");
      return response;
    } catch (error) {
      message.error("Error de credenciales.");
    } finally {
      setLoading(false);
    }
  };
    
  return (
    <Form layout="vertical" onFinish={handleSubmit}>
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
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Acceder
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
