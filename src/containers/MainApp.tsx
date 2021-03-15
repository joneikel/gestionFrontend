import { Layout } from "antd";
import ContentApp from './ContentApp';
import { BrowserRouter as Router } from "react-router-dom";
import HeaderApp from "./HeaderApp";
import UserContainer from "../unstated/UserContainer";
import SidebarApp from "./SidebarApp";
import { routes } from "../components/AppRouter/SidebarRoutes";

const MainApp = () => {
  const user = UserContainer.useContainer();

  return (
    <Router>
      <Layout className="layout">
        <HeaderApp />
        <Layout>
          {user.user?.scopes.length &&
            <SidebarApp items={routes} />}
          <ContentApp />
        </Layout>
      </Layout>
    </Router>

  )
}

export default MainApp;