import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import EcLoading from "./EcLoading";


const ActivityPage = React.lazy(() => import("../../pages/ActivityPage"));

const ProgramForm = React.lazy(() => import("../../pages/ProgramPage/forms/ProgramForm"));
const ProgramPage = React.lazy(() => import("../../pages/ProgramPage"));

const ProjectPage = React.lazy(() => import("../../pages/ProjectPage"));
const ProjectForm = React.lazy(() => import("../../pages/ProjectPage/forms/ProjectForm"));

const InstitutionPage = React.lazy(() => import("../../pages/InstitutionPage"));
const InstitutionForm = React.lazy(() => import("../../pages/InstitutionPage/forms/InstitutionForm"));
const ExecutiveInstitutionForm = React.lazy(() => import("../../pages/InstitutionPage/forms/ExecutiveInstitutionForm"));


const AppRouter = () => {
  return (
    <Suspense fallback={<EcLoading />}>
      <Switch>
        <Route exact path="/nueva-actividad" component={() => (
            <ActivityPage />
        )}/>

        <Route exact path="/listar-programas" component={() => (
            <ProgramPage />
        )}/>

        <Route exact path="/nuevo-programa" component={() => (
            <ProgramForm />
        )}/>

      <Route exact path="/listar-proyectos" component={() => (
            <ProjectPage />
        )}/>

      <Route exact path="/nuevo-proyecto" component={() => (
            <ProjectForm />
        )}/>
      
      <Route exact path="/listar-secretarías" component={() => (
            <InstitutionPage />
        )}/>

      <Route exact path="/nueva-secretaría" component={() => (
            <InstitutionForm />
        )}/>

      <Route exact path="/nueva-secretaría-ejecutiva" component={() => (
            <ExecutiveInstitutionForm />
        )}/>
        
        {/* <Route exact path="/no-autorizado" component={() => <Unauthorized />} />
        <Route exact path="* *" component={() => <PageNotFound />} /> */}
      </Switch>
    </Suspense>
  );
};

export default AppRouter;
