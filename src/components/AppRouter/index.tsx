import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import StatisticsPage from "../../pages/StatisticsPage";
import EcLoading from "./EcLoading";
import Unauthorized from "../errors/unauthorized";
import PageNotFound from "../errors/not-found";
import ProtectedComponent from "./ProtectedComponent";

const ActivityForm = React.lazy(
  () => import("../../pages/ActivityPage/forms/ActivityForm")
);
const ActivityPage = React.lazy(() => import("../../pages/ActivityPage"));

const ProgramForm = React.lazy(
  () => import("../../pages/ProgramPage/forms/ProgramForm")
);
const ProgramPage = React.lazy(() => import("../../pages/ProgramPage"));

const ProjectPage = React.lazy(() => import("../../pages/ProjectPage"));
const ProjectForm = React.lazy(
  () => import("../../pages/ProjectPage/forms/ProjectForm")
);
const ProjectDetails = React.lazy(
  () => import("../../pages/ProjectPage/components/ProjectDetails")
);

const InstitutionPage = React.lazy(() => import("../../pages/InstitutionPage"));
const InstitutionForm = React.lazy(
  () => import("../../pages/InstitutionPage/forms/InstitutionForm")
);
const ExecutiveInstitutionForm = React.lazy(
  () => import("../../pages/InstitutionPage/forms/ExecutiveInstitutionForm")
);

const MeasurementForm = React.lazy(
  () => import("../../pages/MeasurementPage/forms/MeasurementForm")
);

const UserForm = React.lazy(
  () => import("../../pages/UserPage/forms/UserForm")
);

const Dash = React.lazy(() => import("../../pages/Dash"));

const LoginForm = React.lazy(() => import("../../containers/components/LoginMain"));

const AppRouter = () => {
  return (
    <Suspense fallback={<EcLoading />}>
      <Switch>
        <Route exact path="/dashboard" component={() => <Dash />} />
        
        <Route
          exact
          path="/nueva-unidad-medida"
          component={() => 
          <MeasurementForm />}
        />

        <Route
          exact
          path="/listar-actividades"
          component={() => 
            <ProtectedComponent scope="activities:read">
              <ActivityPage />
            </ProtectedComponent>
          }
        />

        <Route
          exact
          path="/nueva-actividad"
          component={() => 
            <ProtectedComponent scope="activities:create">
              <ActivityForm />
            </ProtectedComponent>
          }
        />

        <Route
          exact
          path="/listar-programas"
          component={() => 
          
            <ProtectedComponent scope="programs:read">
              <ProgramPage />
            </ProtectedComponent>}
        />

        <Route exact path="/nuevo-programa" component={() => <ProgramForm />} />

        <Route
          exact
          path="/listar-proyectos"
          component={() => 
            <ProtectedComponent scope="projects:read">
            <ProjectPage />
          </ProtectedComponent>
          }
        />

        <Route exact path="/nuevo-proyecto" component={() => 
        <ProtectedComponent scope="projects:create">
        <ProjectForm />
      </ProtectedComponent>
        } />

        <Route
          exact
          path="/detalles-de-proyecto"
          component={() => 
            <ProtectedComponent scope="projects:read">
            <ProjectDetails />
          </ProtectedComponent>
          }
        />

        <Route
          exact
          path="/listar-secretarías"
          component={() => 
            <ProtectedComponent scope="institutions:read">
              <InstitutionPage />
            </ProtectedComponent>
          }
        />

        <Route
          exact
          path="/nueva-secretaria"
          component={() => 
            <ProtectedComponent scope="institutions:create">
              <InstitutionForm />
            </ProtectedComponent>
          }
        />

        <Route
          exact
          path="/editar-secretaria/:institution_id"
          component={() => 
            <ProtectedComponent scope="institutions:update">
              <InstitutionForm />
            </ProtectedComponent>
          }
        />

        <Route
          exact
          path="/nueva-secretaria-ejecutiva"
          component={() => 
            <ProtectedComponent scope="institutions:create">
              <ExecutiveInstitutionForm />
            </ProtectedComponent>
          }
        />

        <Route
          exact
          path="/estadisticas"
          component={() => 
            <ProtectedComponent scope="statistics:read">
              <StatisticsPage />
            </ProtectedComponent>
          }
        />

        <Route exact path="/" component={() => <Dash />} />

        <Route exact path="/login" component={() => <LoginForm />} />

        <Route
          exact
          path="/nuevo-usuario"
          component={() => 
            <ProtectedComponent scope="users:create">
              <UserForm />
            </ProtectedComponent>
          }
        />

        /* <Route exact path="/no-autorizado" component={() => <Unauthorized />} />
        <Route exact path="* *" component={() => <PageNotFound />} /> 
      </Switch>
    </Suspense>
  );
};

export default AppRouter;
