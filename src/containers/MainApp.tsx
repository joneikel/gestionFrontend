import React from 'react';
import { Layout } from "antd";
import ContentApp from './ContentApp';
import { BrowserRouter as Router } from "react-router-dom";

const MainApp = () => {
  return (
    <Router>
      <Layout className="layout">
        <ContentApp />
      </Layout>
    </Router>

  )
}

export default MainApp;