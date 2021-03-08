import React, { useState } from "react";
import { Card, Tag, Progress, Col, Row, Typography } from "antd";
import { useHistory } from "react-router-dom";
import { Budget, MeasurementUnit, Project } from "../../../models";
import { moneyFormatter } from "../../../helpers";
import UpdateProjectStatusModal from "./UpdateProjectStatusModal";
import IncreaseProjectBudgetModal from "./IncreaseProjectBudgetModal";
import IncreaseProjectGoalsModal from "./IncreaseProjectGoalsModal";
import GoalIndicator from "./GoalIndicator";
import BudgetDetail from "./BudgetDetail";

const ProjectDetails = () => {
  const history = useHistory();
  const [project, setProject] = useState<Project>(history.location.state as Project);
  const [loading, setLoading] = useState<boolean>(false);

  const updateProject = (newProject: Project) => {
    setProject(newProject);
  }

  return (
    <>
      { project ?
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <Typography.Title>{project.name}</Typography.Title>
          </Col>
          <Col span={24}>
            <Card title="Presupuesto"  extra={
              <IncreaseProjectBudgetModal
                project_id={project.id}
                onChange={updateProject}
              />}>
              <BudgetDetail budget={project.budgets} />
            </Card>
          </Col>
          <Col span={24}>
            <Card title="Metas del proyecto" extra={<IncreaseProjectGoalsModal />}>
              <div style={{ display: "flex", flexFlow: "row" }} >
                {project.measurement_unit.map((unit: MeasurementUnit) => (
                  <div style={{ margin: '0px 10px' }}>
                    <GoalIndicator
                      unit={unit}
                      proposed_goal={unit.pivot.proposed_goal}
                      reached_goal={unit.pivot.reached_goal || 0} />
                  </div>
                ))}
              </div>
            </Card>
          </Col>
          <Col>
            {project.init_date}
          </Col>
          <Col>
            {project.project_status.name &&
              <UpdateProjectStatusModal
                project_status={project.project_status}
                project_id={project.id}
                onChange={updateProject}
              />
            }
          </Col>
          <Col>
            {project.end_date ? project.end_date : "Sin culminar"}
          </Col>
          <Col>
            {project.budgets && project.budgets.filter(x => x.is_budget_increase === true).map((budget: Budget) => (
              <>
                <Tag className="information-tag">
                  {moneyFormatter(budget.value.toString())} {budget.budget_source.name}{" "}
                </Tag>
                <br />
              </>
            ))}

          </Col>
        </Row> : <Progress percent={99.9} type='dashboard' />}
    </>
  );
};

export default ProjectDetails;
