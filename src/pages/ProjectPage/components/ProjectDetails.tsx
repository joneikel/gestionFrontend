import React from "react";
import { Descriptions, Card, Tag } from "antd";
import { useHistory } from "react-router-dom";
import ActivityPage from "../../ActivityPage";
import CustomPageHeader from "../../../components/PageHeader";
import { Budget, MeasurementUnit, Project } from "../../../models";
import { moneyFormatter } from "../../../helpers";
import UpdateProjectStatusModal from "./UpdateProjectStatusModal";

const ProjectDetails = () => {
  const history = useHistory();
  const project = history.location.state as Project;

  console.log(project);

  return (
    <Card
      title={
        <CustomPageHeader title={`Detalles del proyecto "${project.name}"`} />
      }
    >
      <Descriptions bordered>
        <Descriptions.Item label="Nombre:">{project.name}</Descriptions.Item>
        <Descriptions.Item label="Descripción:" span={2}>
          {project.description}
        </Descriptions.Item>
        <Descriptions.Item label="¿Planificado?" span={1}>
          {project.is_planified === 0 ? "No" : "Si"}
        </Descriptions.Item>
        <Descriptions.Item label="Presupuesto según origen:">
          {project.budgets.map((budget: Budget) => (
            <>
              <Tag style={{ padding: "2px" }}>
                {moneyFormatter(budget.value.toString())} {budget.budget_source.name}{" "}
              </Tag>
              <br />
            </>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="Presupuesto total:">
          <Tag style={{ padding: "2px" }}>
            {
            moneyFormatter((project.budgets
              .map((x: Budget) => {
                let fixed_value = Number(x.value);
                return fixed_value
              })
              .reduce((a, b) => {
                return a + b;
              })).toString())
          }
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Areas de inversión:">
          {project.investment_sub_areas.map((area: any) => (
            <>
              <Tag style={{ padding: "2px" }}>{area.name}</Tag>
              <br />
            </>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="Unidad de medida:">
         {project.measurement_unit.map((x:MeasurementUnit) => (
            <div style={{marginTop: '4px'}}>
              <Tag style={{ padding: "2px", width: '75px', textAlign: 'center' }}> {x.name}</Tag>
              <Tag style={{ padding: "2px", paddingRight: '7px', paddingLeft: '7px'  }}> Propuesta: {x.pivot.proposed_goal} </Tag>
              <Tag style={{ padding: "2px", paddingRight: '7px', paddingLeft: '7px'  }}> Alcanzada: { x.pivot.reached_goal ? x.pivot.reached_goal : "Por definir" }</Tag>
              <br />
            </div>
          )) } 
        </Descriptions.Item>
        <Descriptions.Item label="Fecha de Inicio:">
          {project.init_date}
        </Descriptions.Item>
        <Descriptions.Item label="Status del proyecto:">
        {project.project_status.name && 
          <UpdateProjectStatusModal 
          project_status={project.project_status} 
          project_id={project.id} 
          onChange={() => console.log('funcion')} 
          />
        }
        </Descriptions.Item>
        <Descriptions.Item label="Fecha de Culminación:">
          {project.end_date ? project.end_date : "Sin culminar"}
        </Descriptions.Item>
      </Descriptions>

      <Card title="Actividades del proyecto">
        <ActivityPage projectId={project.id} projectDetails />
      </Card>
    </Card>
  );
};

export default ProjectDetails;
