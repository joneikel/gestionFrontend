import React from 'react';
import { Col, Dropdown, Layout, Menu, Row, Space, Typography, Image } from 'antd';

const { Header } = Layout;


const HeaderApp = () => {
    return(
        <Header className="header">
        <Row align="middle" justify="end" style={{ width: '100%' }}>
          <Col span={8} style={{display: 'flex', justifyContent: 'start'}}>
            <span style={{color: '#HHH', position: 'absolute', bottom: '-18px', left: '75px'}}>Sistema de Gestión</span> 
          </Col>
        </Row>
      </Header>
    )
}

export default HeaderApp;