import { Menu } from 'antd';
import { SidebarItem } from '../../components/AppRouter/SidebarRoutes';
import { uuidv4 } from '../../helpers';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
type SidebarAppProps = { items: Array<SidebarItem> };

const MainMenu = ({ items }: SidebarAppProps) => {
  return (
    <Menu
      className="main-menu"
      mode="horizontal"
      defaultSelectedKeys={["0"]}
      style={{ height: "100%", borderRight: 0 }}
    >
      <Menu.Item key={0}>
        <Link to={"/dashboard"}>
          <HomeOutlined />
          Inicio
        </Link>
      </Menu.Item>
      {mapItems(items)}
    </Menu>
  )
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

export default MainMenu;