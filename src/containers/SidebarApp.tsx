import React, { ReactNode } from "react";
import { Menu, Avatar } from "antd";
import { Link } from "react-router-dom";
import { SidebarItem } from "../components/AppRouter/SidebarRoutes";
import { uuidv4 } from "../helpers";
import UserContainer from "../unstated/UserContainer";
import { useScopeProps } from "../hooks/useScope";
import { HomeOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;

type SidebarAppProps = { items: Array<SidebarItem> };

const SidebarApp = ({ items }: SidebarAppProps) => {
  const userState = UserContainer.useContainer();
  const scopes = userState.user?.scopes;

  return (
    <Sidebar height={"100vh"} width={160}>
      <Menu>
        <Menu.Item key={0}>
          <Link to={"/dashboard"}>
            <HomeOutlined />
            Inicio
          </Link>
        </Menu.Item>
        {scopes && mapItems(items, scopes)}
      </Menu>
      <Menu style={{ position: "absolute", bottom: "1px" }}>
        <SubMenu
          title={`  ${userState.user?.name.toUpperCase()}`}
          key={uuidv4()}
          icon={
            <Avatar className="avatar-button">
              {userState.user?.name[0].toUpperCase()}{" "}
            </Avatar>
          }
        >
          <Menu.Item onClick={() => userState.logout()}>Salir</Menu.Item>
        </SubMenu>
      </Menu>
    </Sidebar>
  );
};

const mapItems = (items: Array<SidebarItem>, scopes: useScopeProps[]) => {
  return items
    .filter((item: SidebarItem) => scopes.includes(item.scope))
    .map((item: SidebarItem, i: number) =>
      item.children.length > 0 ? (
        <SubMenu key={uuidv4()} title={item.label} icon={item.icon}>
          {mapItems(item.children, scopes)}
        </SubMenu>
      ) : (
        <Menu.Item key={uuidv4()}>
          <Link to={item.link}>
            {item.icon}
            {item.label}
          </Link>
        </Menu.Item>
      )
    );
};

export default SidebarApp;

export const Sidebar = ({
  width,
  height,
  children,
}: {
  width: number;
  height: number | string;
  children: ReactNode | ReactNode[];
}) => {
  const [xPosition, setX] = React.useState(-width);

  React.useEffect(() => {
    setX(0);
  }, []);
  return (
    <React.Fragment>
      <div
        className="side-bar"
        style={{
          transform: `translatex(${xPosition}px)`,
          width: width,
          minHeight: height,
        }}
      >
        <div className="sidebar-content">{children}</div>
      </div>
    </React.Fragment>
  );
};
