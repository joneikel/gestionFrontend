import React, { ReactNode } from "react";
import { Col, Layout, Row } from "antd";
const { Header } = Layout;

const HeaderApp = ({ children }: { children: ReactNode }) => {
  return (
    <Header className="header">
      <Row align="bottom" justify="start" style={{ width: "100%" }}>
        <Col span={24} style={{ justifyContent: "start" }}>
          <h1 className="app-title">
            Gestión de proyectos y actividades
          </h1>
        </Col>
        <Col span={24}>
          {children}
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderApp;
