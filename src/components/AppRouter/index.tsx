import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import EcLoading from "./EcLoading";


const ActivityPage = React.lazy(() => import("../../pages/ActivityPage"));


const AppRouter = () => {
  return (
    <Suspense fallback={<EcLoading />}>
      <Switch>
        <Route exact path="/activity-page" component={() => (
            <ActivityPage />
        )} 
        />
        
        {/* <Route exact path="/no-autorizado" component={() => <Unauthorized />} />
        <Route exact path="* *" component={() => <PageNotFound />} /> */}
      </Switch>
    </Suspense>
  );
};

export default AppRouter;
