import React from 'react';
import { Layout } from "antd";
import ContentApp from './ContentApp';
import HeaderApp from './HeaderApp';
import SidebarApp from './SidebarApp'; 
import { BrowserRouter as Router } from "react-router-dom";
import { routes } from "../components/AppRouter/SidebarRoutes";

const MainApp = () => {
  return (
    <Router>
      <Layout>
        <HeaderApp/>
          <Layout>
            <SidebarApp items={routes} />
            <ContentApp/>  
          </Layout>
      </Layout>
    </Router>
        
  )
}

export default MainApp;