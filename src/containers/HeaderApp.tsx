import { Layout, Avatar, Dropdown, Menu, Button } from "antd";
import UserContainer from "../unstated/UserContainer";
const { Header } = Layout;

const HeaderApp = () => {
  const userState = UserContainer.useContainer();

  return (
    <Header className="header">
      <div style={{display: 'flex'}}>
        <h1 className="app-title">titulo</h1>
        <span style={{flex: '1 1'}}></span>
        <div style={{lineHeight: '56px'}}>
          <Dropdown placement="bottomCenter" overlay={<AvatarItems />}>
            <Avatar size={40}>{userState.user?.name.toUpperCase()} </Avatar>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
};

export default HeaderApp;

const AvatarItems = () => {
  const userState = UserContainer.useContainer();

  return (
    <Menu>
      <Menu.Item>
        <Button type="link" onClick={() => userState.logout()}>
          Cerrar sesión
        </Button>
      </Menu.Item>
    </Menu>
  );
};
