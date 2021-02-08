import { Space } from "antd";
import React from "react";
import ChartsPage from "../ChartsPage";
import GroupedBar from "../ChartsPage/components/Multibar";

const Dash = () => {
  return (
    <Space direction="vertical" style={{width: '100%'}}>
      <GroupedBar
        title="Distribución de actividades en los municipios del estado agrupadas por sector"      
        labels={[
          "Julián Mellado",
          "Leonardo Infante",
          "Camaguán",
          "Pedro Zaraza",
          "Las Mercedes",
          "El Socorro",
          "Francisco de Miranda",
        ]}
        datasets={[
          {
            label: "ECONOMÍA",
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
              (i) => Math.trunc(Math.random() * 40) + 1
            ),
            backgroundColor: "#4287f5",
          },
          {
            label: "TECNOLOGÍA",
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
              (i) => Math.trunc(Math.random() * 40) + 1
            ),
            backgroundColor: "#9342f5",
          },
          {
            label: "SEGURIDAD",
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
              (i) => Math.trunc(Math.random() * 40) + 1
            ),
            backgroundColor: "#d91a76",
          },
          {
            label: "DEPORTE",
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
              (i) => Math.trunc(Math.random() * 40) + 1
            ),
            backgroundColor: "#6ad419",
          },
          {
            label: "POLÍTICO",
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
              (i) => Math.trunc(Math.random() * 40) + 1
            ),
            backgroundColor: "#cc6210",
          },
          {
            label: "SOCIAL",
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
              (i) => Math.trunc(Math.random() * 40) + 1
            ),
            backgroundColor: "#cc1010",
          },
          {
            label: "CULTURA",
            data: [39, 30, 6, 2, 3, 26, 9, 5, 4, 3, 30, 5, 20, 30, 15],
            backgroundColor: "#05c7f2",
          },
          {
            label: "SERVICIOS PÚBLICOS",
            data: [21, 24, 3, 5, 40, 28, 25, 7, 11, 4, 31, 5, 33, 10, 23],
            backgroundColor: "#330596",
          },
          {
            label: "COMUNICACIÓN",
            data: [21, 24, 3, 5, 40, 28, 25, 7, 11, 4, 31, 5, 33, 10, 23],
            backgroundColor: "#f58f00",
          },
          {
            label: "SALUD",
            data: [21, 24, 3, 5, 40, 28, 25, 7, 11, 4, 31, 5, 33, 10, 23],
            backgroundColor: "#1d2640",
          },
          {
            label: "EDUCACIÓN",
            data: [21, 24, 3, 5, 40, 28, 25, 7, 11, 4, 31, 5, 33, 10, 23],
            backgroundColor: "#12e6e2",
          },
        ]}
      />
      <GroupedBar
        title="Distribución de actividades en los municipios del estado agrupadas por sector"
        labels={[
          "Chaguaramas",
          "Santa María de Ipire",
          "Ortiz",
          "José Tadeo Monagas",
          "San José de Guaribe",
          "José Félix Ribas",
          "Juan Germán Roscio",
          "San Jerónimo de Guayabal",
        ]}
        datasets={[
          {
            label: "ECONOMÍA",
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
              (i) => Math.trunc(Math.random() * 40) + 1
            ),
            backgroundColor: "#4287f5",
          },
          {
            label: "TECNOLOGÍA",
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
              (i) => Math.trunc(Math.random() * 40) + 1
            ),
            backgroundColor: "#9342f5",
          },
          {
            label: "SEGURIDAD",
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
              (i) => Math.trunc(Math.random() * 40) + 1
            ),
            backgroundColor: "#d91a76",
          },
          {
            label: "DEPORTE",
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
              (i) => Math.trunc(Math.random() * 40) + 1
            ),
            backgroundColor: "#6ad419",
          },
          {
            label: "POLÍTICO",
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
              (i) => Math.trunc(Math.random() * 40) + 1
            ),
            backgroundColor: "#cc6210",
          },
          {
            label: "SOCIAL",
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
              (i) => Math.trunc(Math.random() * 40) + 1
            ),
            backgroundColor: "#cc1010",
          },
          {
            label: "CULTURA",
            data: [39, 30, 6, 2, 3, 26, 9, 5, 4, 3, 30, 5, 20, 30, 15],
            backgroundColor: "#05c7f2",
          },
          {
            label: "SERVICIOS PÚBLICOS",
            data: [21, 24, 3, 5, 40, 28, 25, 7, 11, 4, 31, 5, 33, 10, 23],
            backgroundColor: "#330596",
          },
          {
            label: "COMUNICACIÓN",
            data: [21, 24, 3, 5, 40, 28, 25, 7, 11, 4, 31, 5, 33, 10, 23],
            backgroundColor: "#f58f00",
          },
          {
            label: "SALUD",
            data: [21, 24, 3, 5, 40, 28, 25, 7, 11, 4, 31, 5, 33, 10, 23],
            backgroundColor: "#1d2640",
          },
          {
            label: "EDUCACIÓN",
            data: [21, 24, 3, 5, 40, 28, 25, 7, 11, 4, 31, 5, 33, 10, 23],
            backgroundColor: "#12e6e2",
          },
        ]}
      />
      <ChartsPage />
    </Space>
  );
};

export default Dash;