import React, { ReactNode } from "react";
import { Col, Layout, Row, Typography } from "antd";
const { Header } = Layout;

const HeaderApp = ({ children }: { children: ReactNode }) => {
  const { Title } = Typography;
  return (
    <Header className="header">
      <Row align="bottom" justify="start" style={{ width: "100%" }}>
        <Col span={24} style={{ justifyContent: "start" }}>
          <Title level={3} className="app-title">
            Gestión de proyectos y actividades
          </Title>
        </Col>
        <Col span={24}>
          {children}
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderApp;
