import React, { ReactNode } from "react";
import { Col, Layout, Row, Avatar, Dropdown, Menu, Button } from "antd";
import UserContainer from "../unstated/UserContainer";
const { Header } = Layout;

const HeaderApp = ({ children }: { children: ReactNode }) => {

  const userState = UserContainer.useContainer();
  
  return (
    <Header className="header">
      <Row align="bottom" justify="start" style={{ width: "100%" }}>
        <Col span={23} style={{ justifyContent: "start" }}>
          <h1 className="app-title">
            Gestión de proyectos y actividades
          </h1>
        </Col>
        <Col span={1} >
          <Dropdown placement="bottomCenter" overlay={<AvatarItems/>}>
            <Avatar size={40}>{userState.user?.name.toUpperCase()} </Avatar>
            </Dropdown>
          
        </Col>
        <Col span={24}>
          {children}
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderApp;


const AvatarItems = () => {
  const userState = UserContainer.useContainer();

  return (
    <Menu>
      <Menu.Item >
        <Button onClick={() => userState.logout()}>Cerrar sesión</Button>
      </Menu.Item>
    </Menu>
  )
    
}
