import React from "react";
import { Layout } from 'antd';
import LoginForm from '../../pages/LoginPage/forms/LoginForm'


const { Content } = Layout;
const LoginMain = ()=> {

    return (

    <Layout>
      
      <Content> <LoginForm/> </Content>
     
    </Layout>

    )
}
export default LoginMain;