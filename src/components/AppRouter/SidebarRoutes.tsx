import React, { ReactNode } from 'react';
import {CalendarOutlined} from "@ant-design/icons";

export const routes: SidebarItem[] = [
    {
        label: "Actividad",
        icon: <CalendarOutlined />,
        link: "/activity-page",
        children: [],
      },
]


export type SidebarItem = {
    label: string;
    icon: ReactNode;
    link: string;
    children: Array<SidebarItem>;
  };