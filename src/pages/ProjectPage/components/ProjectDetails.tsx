import React, { useState } from "react";
import { Card, Tag, Progress, Col, Row, Typography, Empty } from "antd";
import { useHistory } from "react-router-dom";
import { Budget, MeasurementUnit, Project } from "../../../models";
import { moneyFormatter } from "../../../helpers";
import UpdateProjectStatusModal from "./UpdateProjectStatusModal";
import IncreaseProjectBudgetModal from "./IncreaseProjectBudgetModal";
import IncreaseProjectGoalsModal from "./IncreaseProjectGoalsModal";
import GoalIndicator from "./GoalIndicator";
import BudgetDetail, { BudgetGraph } from "./BudgetDetail";
import { useActivities } from "../../../hooks/useActivities";
import ActivityList from "./ActivityList";
import ModifyCulminationDateModal from "./ModifyCulminationDateModal";
import ActivityImageGallery from "../../ActivityPage/components/ImageGallery";
import UserContainer from "../../../unstated/UserContainer";

const ProjectDetails = () => {

  const { user } = UserContainer.useContainer();
  const updateAuthorization = user?.scopes.includes("projects:update") ? true : false;

  const history = useHistory();
  const [project, setProject] = useState<Project>(
    history.location.state as Project
  );
  const [activities, loadingActivities] = useActivities({
    project_id: project.id,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const updateProject = (newProject: Project) => {
    setProject(newProject);
  };

  return (
    <>
      {project ? (
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <Typography.Title>{project.name}</Typography.Title>
          </Col>
          <Col span={24}>
            <UpdateProjectStatusModal
              authorization={updateAuthorization}
              project_status={project.project_status}
              project_id={project.id}
              onChange={updateProject}
            />
          </Col>
          <Col span={12}>
            <Row gutter={[10, 10]}>
              <Col span={24}>
                <Card className="floating-element"
                  headStyle={{ border: "none" }}
                  title="metas"
                  extra={
                    updateAuthorization && <IncreaseProjectGoalsModal
                      onChange={updateProject}
                      selectedUnits={project.measurement_unit.map((x) => x.id)}
                      project_id={project.id}
                    />
                  }
                >
                  <div
                    style={{
                      display: "flex",
                      flexFlow: "row wrap",
                      justifyContent: "center",
                    }}
                  >
                    {project.measurement_unit.map((unit: MeasurementUnit) => (
                      <div style={{ margin: "0px 10px" }}>
                        <GoalIndicator
                          unit={unit}
                          proposed_goal={unit.pivot.proposed_goal}
                          reached_goal={unit.pivot.reached_goal || 0}
                        />
                      </div>
                    ))}
                  </div>
                </Card>
              </Col>
              <Col span={24}>
                <Card
                  className="floating-element"
                  title="memoria fotografica" headStyle={{ border: "none" }}>
                  {activities.length > 0 ? (
                    <ActivityImageGallery images={activities.map(act => act.images[0])} />
                  ) : <Empty description="No ha cargado imagenes" />}
                </Card>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row gutter={[10, 10]}>
              <Col span={24}>
                <Card title="actividades" headStyle={{ border: "none" }} className="floating-element">
                  <ActivityList activities={activities} />
                </Card>
              </Col>
              <Col span={24}>
                <Card className="floating-element"
                  title="presupuesto"
                  headStyle={{ border: "none" }}
                  extra={
                    updateAuthorization && <IncreaseProjectBudgetModal
                      project_id={project.id}
                      onChange={updateProject}
                    />
                  }
                >
                  <BudgetDetail budget={project.budgets} />
                </Card>
              </Col>
              <Col span={24}>
                <Card className="floating-element">
                  <BudgetGraph budget={project.budgets} />
                </Card>
              </Col>
            </Row>
          </Col>
          <Col>
            {project.end_date ? project.end_date : "Sin culminar"}
            <br />
            {project.modified_culmination_dates.length > 0
              ? project.modified_culmination_dates[project.modified_culmination_dates.length - 1].modified_date
              : "Sin modificar"}
            <br />

            {updateAuthorization && <ModifyCulminationDateModal
              onChange={updateProject}
              project_id={project.id}
            />}
          </Col>
        </Row>
      ) : (
          <Progress percent={99.9} type="dashboard" />
        )}
    </>
  );
};

export default ProjectDetails;
