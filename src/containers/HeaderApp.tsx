import React from "react";
import { Col, Layout, Row, Typography } from "antd";
const { Header } = Layout;

const HeaderApp = () => {
  const { Title } = Typography;
  return (
    <Header className="header">
      <Row align="bottom" justify="center" style={{ width: "100%" }}>
        <Col span={24} style={{ justifyContent: "center" }}>
          <Title level={3} style={{ color: "white"}}>
            REGISTRO DE PROYECTOS
          </Title>
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderApp;
