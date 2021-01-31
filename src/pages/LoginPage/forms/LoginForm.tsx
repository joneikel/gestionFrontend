import { Button, Form, Input } from "antd";
import React from "react";

const LoginForm = () => {
  const handleSubmit = (values: any) => {
    console.log(values);
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
