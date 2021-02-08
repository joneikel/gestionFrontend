import React from "react";
import { Layout } from "antd";
import AppRouter from "../components/AppRouter";

const { Content } = Layout;

const ContentApp = () => {
  return (
    <React.Fragment>
      <Content
        className="container"
      >
        <AppRouter />
      </Content>
    </React.Fragment>
  );
}

export default ContentApp;