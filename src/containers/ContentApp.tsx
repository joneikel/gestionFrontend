import React from "react";
import { Layout } from "antd";
import AppRouter from "../components/AppRouter";
import SidebarApp from "./SidebarApp";
import { routes } from "../components/AppRouter/SidebarRoutes";
import UserContainer from "../unstated/UserContainer";

const { Content } = Layout;

const ContentApp = () => {

  const user = UserContainer.useContainer();

  return (
    <div className="main-layout">
      {user.user?.scopes.length && 
      <SidebarApp items={routes} />}
      <Content className="container">
        <AppRouter />
      </Content>
    </div>
  );
}

export default ContentApp;