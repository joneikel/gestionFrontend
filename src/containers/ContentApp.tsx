import { Layout } from "antd";
import AppRouter from "../components/AppRouter";

const { Content } = Layout;

const ContentApp = () => {


  return (
    <div className="main-layout">
      <Content className="container">
        <AppRouter />
      </Content>
    </div>
  );
}

export default ContentApp;