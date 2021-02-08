import React from 'react';
import { Layout } from "antd";
import ContentApp from './ContentApp';
import HeaderApp from './HeaderApp';
import { BrowserRouter as Router } from "react-router-dom";
import { routes } from "../components/AppRouter/SidebarRoutes";
import MainMenu from './components/MainMenu';

const MainApp = () => {
  return (
    <Router>
      <Layout className="layout">
        <HeaderApp>
          <MainMenu items={routes} />
        </HeaderApp>
          <ContentApp />
      </Layout>
    </Router>

  )
}

export default MainApp;