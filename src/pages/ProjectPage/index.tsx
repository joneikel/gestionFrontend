import { Card } from "antd";
import { useState } from "react";
import UserContainer from "../../unstated/UserContainer";
import ProjectFilters from './components/ProjectFilter';
import ProjectList from "./components/ProjectList";

const ProjectPage = () => {

  const { user } = UserContainer.useContainer();

  const default_institution = user?.institution?.id ? user.institution.id : undefined;
  

  const [filters, setFilters] = useState({ institution_id: default_institution});

  return (
    <Card className="floating-element">
      <div style={{padding: '10px 10px 10px 0px'}}>
        <ProjectFilters onChange={(f: any) => setFilters(f)} default_institution={default_institution}  />
      </div>
        <ProjectList projectFilters={filters} />
    </Card>
  );
};



export default ProjectPage;

export type ProjectFilters = {
  institution_id?: string | null,
  investment_areas?: string,
  project_status_id?: string,
  is_planified?: boolean,
  municipio_id?: string
}