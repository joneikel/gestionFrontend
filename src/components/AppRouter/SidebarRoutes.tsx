import React, { ReactNode } from 'react';
import {CalendarOutlined} from "@ant-design/icons";

export const routes: SidebarItem[] = [
    {
        label: "Actividad",
        icon: <CalendarOutlined />,
        link: "/nueva-actividad",
        children: [],
      },{
        label: "Programas",
        icon: <CalendarOutlined />,
        link: "#",
        children: [
          {
            label: "Listar",
            icon: <CalendarOutlined />,
            link: "/listar-programas",
            children: [],
          }, {
            label: "Nuevo",
            icon: <CalendarOutlined />,
            link: "/nuevo-programa",
            children: [],
          }
        ],
      },{
        label: "Proyectos",
        icon: <CalendarOutlined />,
        link: "#",
        children: [
          {
            label: "Listar",
            icon: <CalendarOutlined />,
            link: "/listar-proyectos",
            children: [],
          },{
            label: "Nuevo",
            icon: <CalendarOutlined />,
            link: "/nuevo-proyecto",
            children: [],
          }
        ],
      },
]


export type SidebarItem = {
    label: string;
    icon: ReactNode;
    link: string;
    children: Array<SidebarItem>;
  };