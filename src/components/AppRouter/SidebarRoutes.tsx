import React, { ReactNode } from 'react';
import {
  CalendarOutlined,
  FolderOutlined,
  AudioOutlined,
  PlusCircleOutlined,
  BarChartOutlined,
  BankOutlined,
  UserOutlined,
  UserAddOutlined,
  SettingOutlined,
  UserSwitchOutlined,
  BlockOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useScopeProps } from '../../hooks/useScope';

export const routes: SidebarItem[] = [
  {
    scope: "institutions:menu",
    label: "Secretarías",
    icon: <BankOutlined />,
    link: "#",
    children: [
          /* {
            scope:"institutions:read",
            label: "Listar",
            icon: <CalendarOutlined />,
            link: "/listar-secretarias",
            children: [],
          }, */ {
        scope: "institutions:create",
        label: "Nueva Ejecutiva",
        icon: <PlusCircleOutlined />,
        link: "/nueva-secretaria-ejecutiva",
        children: [],
      }, {
        scope: "institutions:create",
        label: "Nueva",
        icon: <PlusCircleOutlined />,
        link: "/nueva-secretaria",
        children: [],
      },{
        scope: "institutions:update",
        label: "Misión y visión",
        icon: <PlusCircleOutlined />,
        link: "/mision-vision",
        children: [],
      }
    ],
  }, {
    scope: "programs:menu",
    label: "Programas",
    icon: <CalendarOutlined />,
    link: "#",
    children: [
      {
        scope: "programs:read",
        label: "Listar",
        icon: <CalendarOutlined />,
        link: "/listar-programas",
        children: [],
      }, {
        scope: "programs:create",
        label: "Nuevo",
        icon: <PlusCircleOutlined />,
        link: "/nuevo-programa",
        children: [],
      }
    ],
  }, {
    scope: "projects:menu",
    label: "Proyectos",
    icon: <FolderOutlined />,
    link: "#",
    children: [
      {
        scope: "projects:read",
        label: "Listar",
        icon: <CalendarOutlined />,
        link: "/listar-proyectos",
        children: [],
      }, {
        scope: "projects:create",
        label: "Nuevo",
        icon: <PlusCircleOutlined />,
        link: "/nuevo-proyecto",
        children: [],
      }
    ],
  },
  {
    scope: "activities:menu",
    label: "Actividades",
    icon: <AudioOutlined />,
    link: "#",
    children: [
      {
        scope: "activities:read",
        label: "listar",
        icon: <PlusCircleOutlined />,
        link: "/listar-actividades",
        children: [],
      }, {
        scope: "activities:create",
        label: "Nueva",
        icon: <PlusCircleOutlined />,
        link: "/nueva-actividad",
        children: [],
      }
    ],
  },
  {
    scope: "map:menu",
    label: "Mapa",
    icon: null,
    link: "/mapa",
    children: [],
  },
  {
    scope: "statistics:menu",
    label: "Estadisticas",
    icon: <BarChartOutlined />,
    link: "/estadisticas",
    children: [],
  }, {
    scope: "users:menu",
    label: "Usuarios",
    icon: <UserOutlined />,
    link: "#",
    children: [
      {
        scope: "users:create",
        label: "Nuevo",
        icon: <UserAddOutlined />,
        link: "/nuevo-usuario",
        children: [],
      },
    ],
  }, {
    scope: "users:create",
    label: "Configuración",
    icon: <SettingOutlined />,
    link: "/nuevo-usuario",
    children: [
      {
        scope: "roles:create",
        label: "Roles",
        icon: <UserSwitchOutlined />,
        link: "#",
        children: [
          {
            scope: "roles:read",
            label: "Listar",
            icon: <UserSwitchOutlined />,
            link: "/listar-roles",
            children: [],
          }, {
            scope: "roles:create",
            label: "Nuevo",
            icon: <UserSwitchOutlined />,
            link: "/nuevo-rol",
            children: [],
          },
        ],
      }, {
        scope: "modules:create",
        label: "Modulos",
        icon: <BlockOutlined />,
        link: "/nuevo-modulo",
        children: [],
      }, {
        scope: "scopes:create",
        label: "Scopes",
        icon: <EyeOutlined />,
        link: "/nuevo-scope",
        children: [],
      },
    ],
  },
]


export type SidebarItem = {
  label: string;
  icon: ReactNode;
  link: string;
  children: Array<SidebarItem>;
  scope: useScopeProps
};