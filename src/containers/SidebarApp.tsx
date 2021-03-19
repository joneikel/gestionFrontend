import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { SidebarItem } from "../components/AppRouter/SidebarRoutes";
import { uuidv4 } from "../helpers";

const { Sider } = Layout;
const { SubMenu } = Menu;


type SidebarAppProps = { items: Array<SidebarItem> };

const SidebarApp = ({ items }: SidebarAppProps) => {
    return (
        <Sider width={200} breakpoint="lg" collapsedWidth="0" className="site-layout-background floating-element">
          <Menu
            mode="inline"
            defaultSelectedKeys={["0"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            {mapItems(items)}
          </Menu>
        </Sider>
      );
}

const mapItems = (items: Array<SidebarItem>) => {
    return items.map((item: SidebarItem, i: number) =>
      item.children.length > 0 ? (
        <SubMenu key={uuidv4()} title={item.label} icon={item.icon}>
          {mapItems(item.children)}
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