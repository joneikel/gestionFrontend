import { Card } from "antd";
import { useState } from "react";
import ProjectFilters from './components/ProjectFilter';
import ProjectList from "./components/ProjectList";

const ProjectPage = ({defaultFilters} : {defaultFilters?: ProjectFilters}) => {

  const [filters, setFilters] = useState(defaultFilters);

  return (
    <Card className="floating-element">
      <div style={{padding: '10px 10px 10px 0px'}}>
        <ProjectFilters onChange={(f: any) => setFilters(f)}/>
      </div>
        <ProjectList projectFilters={filters} />
    </Card>
  );
};



export default ProjectPage;

export type ProjectFilters = {
  institution_id?: string,
  investment_areas?: string,
  project_status_id?: string,
  is_planified?: boolean,
  municipio_id?: string
}