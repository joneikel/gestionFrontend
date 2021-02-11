import React from "react";
import { Layout } from 'antd';
import LoginForm from '../../pages/LoginPage/forms/LoginForm'


const { Header, Footer, Content } = Layout;
const LoginMain = ()=> {

    return (

    <Layout>
      <Header >Header</Header>
      <Content> <LoginForm/> </Content>
      <Footer>Footer</Footer>
    </Layout>

    )
}
export default LoginMain;