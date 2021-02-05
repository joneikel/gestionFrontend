import React, { ReactNode } from 'react';
import {
  CalendarOutlined,
  BankOutlined,
  FolderOutlined,
  AudioOutlined,
  PlusCircleOutlined
} from "@ant-design/icons";

export const routes: SidebarItem[] = [
      {
        label: "Secretarías",
        icon: <BankOutlined />,
        link: "#",
        children: [
          /* {
            label: "Listar",
            icon: <CalendarOutlined />,
            link: "/listar-secretarías",
            children: [],
          }, */{
            label: "Nueva Ejecutiva",
            icon: <PlusCircleOutlined />,
            link: "/nueva-secretaría-ejecutiva",
            children: [],
          },{
            label: "Nueva",
            icon: <PlusCircleOutlined />,
            link: "/nueva-secretaría",
            children: [],
          },
        ],
      },{
        label: "Programas",
        icon: <CalendarOutlined />,
        link: "#",
        children: [
          /* {
            label: "Listar",
            icon: <CalendarOutlined />,
            link: "/listar-programas",
            children: [],
          }, */ {
            label: "Nuevo",
            icon: <PlusCircleOutlined />,
            link: "/nuevo-programa",
            children: [],
          }
        ],
      },{
        label: "Proyectos",
        icon: <FolderOutlined />,
        link: "#",
        children: [
          {
            label: "Listar",
            icon: <CalendarOutlined />,
            link: "/listar-proyectos",
            children: [],
          },{
            label: "Nuevo",
            icon: <PlusCircleOutlined />,
            link: "/nuevo-proyecto",
            children: [],
          }
        ],
      },{
        label: "Actividades",
        icon: <AudioOutlined />,
        link: "#",
        children: [
          {
            label: "listar",
            icon: <PlusCircleOutlined />,
            link: "/listar-actividades",
            children: [],
          },{
            label: "Nueva",
            icon: <PlusCircleOutlined />,
            link: "/nueva-actividad",
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