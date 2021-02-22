import React, { ReactNode } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { SidebarItem } from "../components/AppRouter/SidebarRoutes";
import { uuidv4 } from "../helpers";
import UserContainer from "../unstated/UserContainer";
import { useScopeProps } from "../hooks/useScope";

const { SubMenu } = Menu;


type SidebarAppProps = { items: Array<SidebarItem> };

const SidebarApp = ({ items }: SidebarAppProps) => {

  const userState = UserContainer.useContainer();
  const scopes = userState.user?.scopes;
  return (
    <Sidebar height={'100vh'} width={200}>
      <Menu>
        {scopes && mapItems(items, scopes)}
      </Menu>
    </Sidebar>
  );
}

const mapItems = (items: Array<SidebarItem>, scopes: useScopeProps[]) => {
  
  return items.filter((item : SidebarItem) => scopes.includes( item.scope )).map((item: SidebarItem, i: number) =>
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

export const Sidebar = ({ width, height, children }:
  {
    width: number,
    height: number | string,
    children: ReactNode | ReactNode[]
  }) => {
  const [xPosition, setX] = React.useState(-width);

  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
    } else {
      setX(-width);
    }
  };

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
          minHeight: height
        }}
      >
        <button
          onClick={() => toggleMenu()}
          className="toggle-menu"
          style={{
            transform: `translate(${width}px, 20vh)`
          }}
        ></button>
        <div className="sidebar-content">{children}</div>
      </div>
    </React.Fragment>
  );
};