import React from "react";
import { Layout, Breadcrumb } from "antd";
import AppRouter from "../components/AppRouter";
import { useLocation, Link } from "react-router-dom";

const { Content } = Layout;

const ContentApp = () => {
  const location = useLocation();
  const breadCrums = location.pathname.split("/");
  return (
    <React.Fragment>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          {breadCrums.map((breadCrum) => (
            <Breadcrumb.Item key={breadCrum}>
            <Link to={`/${breadCrum}`} style={{ textTransform: "lowercase" }}>{breadCrum.replace(/-/g, " ")}</Link>
              </Breadcrumb.Item>
          ))}
        </Breadcrumb>
    
        <Content
          className="site-layout-background"
          style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          }}
        >
         <AppRouter />
        </Content>
      </Layout>
    </React.Fragment>
  );
} 

export default ContentApp;