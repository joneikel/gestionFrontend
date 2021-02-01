import { Card } from "antd";
import React from "react";
import ActivityPage from "../ActivityPage";

const LoginPage = () => {
  return (
    <Card title="Formulario de actividad" style={{ width: "85vw" }}>
      <ActivityPage></ActivityPage>
    </Card>
  );
};

export default LoginPage;
